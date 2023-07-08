import { users, products, purchases, purchasesProducts } from "./database"
import { TUsers, TProducts, TPurchasesProducts } from "./types"
import express, { application, Request, Response } from 'express'
import cors from 'cors'
import { db } from './knex'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//POST
app.post('/users', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const email = req.body.email as string
        const password = req.body.password as string

        if (id[0] !== "u") {
            res.status(400)
            throw new Error("Id invalido. Deve iniciar com letra 'u'")
        }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser uma string")
        }

        const userIdExists = users.find((user) => user.id === id)

        if (userIdExists) {
            res.status(400)
            throw new Error("'id' ja cadastrado")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser uma string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser uma string")
        }

        const userEmailExists = users.find((user) => user.email === email)

        if (userEmailExists) {
            res.status(400)
            throw new Error("'email' ja cadastrado")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser uma string")
        }

        await db.raw(`
            INSERT INTO users (id, name, email, password, created_at)
            VALUES ("${id}","${name}","${email}","${password}", CURRENT_TIMESTAMP);
        `)

        res.status(201).send('Cadastro realizado com sucesso')
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        res.send(error.message)
    }
})

app.post('/products', async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string
        const name = req.body.name as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.imageUrl as string

        if (!id.startsWith("prod")) {
            res.status(400);
            throw new Error("'ID' inválido. Deve iniciar com 'prod'");
        }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'ID' inválido. deve ser uma string")
        }

        const productExists = products.find((product) => product.id === id)

        if (productExists) {
            res.status(400)
            throw new Error("'id' ja cadastrado")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser uma string")
        }

        if (typeof price !== "number") {
            res.status(400)
            throw new Error("'price' deve ser um number")
        }

        if (typeof description !== "string") {
            res.status(400)
            throw new Error("'description' deve ser uma string")
        }

        if (typeof imageUrl !== "string") {
            res.status(400)
            throw new Error("'imageUrl' deve ser uma string")
        }

        await db.raw(`
        INSERT INTO products (id, name, price, description, image_url)
        VALUES ("${id}","${name}","${price}","${description}","${imageUrl}");
        `)

        res.status(201).send('Produto cadastrado com sucesso')
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        res.send(error.message)
    }
})

app.post('/purchases', async (req: Request, res: Response) => {
    try {
        const { id, buyer, products } = req.body;

        // Verificar se o ID começa com "pur"
        if (!id.startsWith("pur")) {
            res.status(400);
            throw new Error("ID inválido. Deve começar com 'pur'");
        }

        // Verificar se o ID é uma string
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("ID inválido. Deve ser uma string");
        }

        // Verificar se o comprador é uma string
        if (typeof buyer !== "string") {
            res.status(400);
            throw new Error("Comprador inválido. Deve ser uma string");
        }

        // Verificar se os produtos são um array
        if (!Array.isArray(products)) {
            res.status(400);
            throw new Error("Produtos inválidos. Deve ser um array");
        }

        // Verificar se os produtos existem e obter seus preços
        const productPrices: { [key: string]: number } = {};
        for (const product of products) {
            const productId: string = product.id;
            const quantity: number = product.quantity;

            // Verificar se o produto existe
            const productExists = await db('products').where('id', productId).first();
            if (!productExists) {
                res.status(400);
                throw new Error(`Produto com ID '${productId}' não existe`);
            }

            // Obter o preço do produto
            const productPrice: number = productExists.price;
            productPrices[productId] = productPrice;
        }

        // Calcular o preço total da compra
        let totalPrice: number = 0;
        for (const product of products) {
            const productId: string = product.id;
            const quantity: number = product.quantity;
            const productPrice: number = productPrices[productId];
            totalPrice += productPrice * quantity;
        }

        // Inserir a compra na tabela 'purchases'
        await db('purchases').insert({
            id: id,
            buyer: buyer,
            total_price: totalPrice,
            created_at: db.fn.now()
        });

        // Inserir os produtos associados na tabela 'purchases_products'
        for (const product of products) {
            const productId: string = product.id;
            const quantity: number = product.quantity;
            await db('purchases_products').insert({
                purchase_id: id,
                product_id: productId,
                quantity: quantity
            });
        }

        res.status(201).send("Compra adicionada com sucesso");
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        res.send(error.message)
    }
});


//GET
app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
        SELECT * FROM users;
       `)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

        res.send(error.message)
    }
})

app.get('/products', async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string

        if (name) {
            const result = await db.raw(`
            SELECT * FROM products
            WHERE name LIKE '${name}';
        `)
            res.status(200).send(result)
        } else {
            const result = await db.raw(`
            SELECT * FROM products;
        `)

            res.status(200).send(result)
        }
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        res.send(error.message)
    }
})

app.get('/purchases', async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
        SELECT 
        purchases.id AS purchaseId,
        purchases.buyer AS buyer,
        purchases.total_price AS totalPrice,
        purchases.created_at AS purchaseDate,
        purchases_products.product_id AS productId,
        purchases_products.quantity AS quantity,
        products.name AS productName,
        products.price AS productPrice
        FROM purchases
        INNER JOIN purchases_products
        ON purchases_products.purchase_id = purchases.id
        INNER JOIN products
        ON purchases_products.product_id = products.id;
       `)

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

        res.send(error.message)
    }
})

//PUT
app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newId = req.body.id as string | undefined
        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newDescription = req.body.description as string | undefined
        const newImageUrl = req.body.imageUrl as string | undefined

        if (newId !== undefined) {
            if (newId[0] !== "u") {
                res.status(400)
                throw new Error("Id invalido. Deve iniciar com letra 'u'")
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400);
                throw new Error("'Nome' deve ser do tipo string");
            }
            if (newName.length < 2) {
                res.status(400);
                throw new Error("'Nome' deve ter no mínimo 2 caracteres");
            }
        }

        if (newPrice !== undefined) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("'price' deve ser do tipo number")
            }
            if (newPrice < 0) {
                res.status(400)
                throw new Error("'price' deve ser maior ou igual a zero")
            }
        }

        if (newDescription !== undefined) {
            if (typeof newDescription !== "string") {
                res.status(400);
                throw new Error("'Description' deve ser do tipo string");
            }
        }

        if (newImageUrl !== undefined) {
            if (typeof newImageUrl !== "string") {
                res.status(400);
                throw new Error("'ImageUrl' deve ser do tipo string");
            }
        }

        const [product] = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}";
        `) // desestruturamos para encontrar o primeiro item do array

        // se existir, aí sim podemos editá-lo
        if (product) {
            await db.raw(`
                UPDATE products
                SET
                    id = "${newId || product.id}",
                    name = "${newName || product.name}",
                    price = "${newPrice || product.price}",
                    description = "${newDescription || product.description}",
                    image_url = "${newImageUrl || product.imageUrl}"
                WHERE
                    id = "${id}";
            `)

        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        res.status(200).send("Produto atualizado com sucesso")
    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

        res.send(error.message)
    }
})

//DELETE
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (id[0] !== "u") {
            res.status(400)
            throw new Error("Id invalido. Deve iniciar com letra 'u'")
        }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser uma string")
        }

        const userExists = users.find((user) => user.id === id)

        if (!userExists) {
            res.status(400)
            throw new Error("'id' nao encontrado")
        }

        const userIndex = users.findIndex((user) => user.id === id)

        if (userIndex >= 0) {
            users.splice(userIndex, 1)
        }

        res.status(200).send("User apagado com sucesso")
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        res.send(error.message)
    }
})

app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (!id.startsWith("prod")) {
            res.status(400);
            throw new Error("'ID' inválido. Deve iniciar com 'prod'");
        }

        const productExists = products.find((product) => product.id === id)

        if (!productExists) {
            res.status(400)
            throw new Error("'id' nao encontrado")
        }

        const productIndex = products.findIndex((product) => product.id === id)

        if (productIndex >= 0) {
            products.splice(productIndex, 1)
        }

        res.status(200).send("Produto apagado com sucesso")
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        res.send(error.message)
    }
})

app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        if (!id.startsWith("pur")) {
            res.status(400);
            throw new Error("'ID' inválido. Deve iniciar com 'pur'");
        }

        // Verificar se a compra existe
        const purchaseExists = await db.raw(`
            SELECT * FROM purchases 
            WHERE id = "${id}";
        `)

        if (!purchaseExists) {
            res.status(400);
            throw new Error(`Compra com ID '${id}' não existe`);
        }

        // Excluir os produtos associados da tabela 'purchases_products'
        await db.raw(`
        DELETE FROM purchases_products WHERE purchase_id = '${id}'
        `);

        // Excluir a compra da tabela 'purchases'
        await db.raw(`
        DELETE FROM purchases WHERE id = '${id}'
        `);

        res.status(200).send("Pedido cancelado com sucesso")
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
        res.send(error.message)
    }
})
