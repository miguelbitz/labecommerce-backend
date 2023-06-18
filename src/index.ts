import { users, products, createProduct, createUser, searchProductsByName } from "./database"
import { TUsers, TProducts } from "./types"
import express, { application, Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//POST
app.post('/users', (req: Request, res: Response) => {
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

        createUser(id, name, email, password)

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

app.post('/products', (req: Request, res: Response) => {
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

        createProduct(id, name, price, description, imageUrl)

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

//GET
app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)
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

app.get('/products', (req: Request, res: Response) => {
    try {
        const name = req.query.name as string

        if (name) {
            const result: TProducts[] = products.filter((product) => {
                return product.name.toLowerCase().includes(name.toLowerCase())
            })
            res.status(200).send(result)
        } else {
            res.status(200).send(products)
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

//PUT
app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const productExists = products.find((product) => product.id === id)

        if (!productExists) {
            res.status(400)
            throw new Error("'id' nao encontrado")
        }

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

        const findProduct = products.find((product) => product.id === id)

        if (findProduct) {
            findProduct.id = newId || findProduct.id
            findProduct.name = newName || findProduct.name
            findProduct.price = newPrice || findProduct.price
            findProduct.description = newDescription || findProduct.description
            findProduct.imageUrl = newImageUrl || findProduct.imageUrl
        }

        res.status(200).send("Produto atualizado com sucesso")
    }catch(error){
        console.log(error)

        if(res.statusCode === 200){
            res.status(500)
        }

        if(error instanceof Error){
            res.send(error.message)
        }else{
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
