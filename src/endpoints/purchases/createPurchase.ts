import { Request, Response } from 'express'
import { db } from '../../knex'


const createPurchase =  async (req: Request, res: Response) => {
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
            created_at: new Date().toLocaleString()
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
        console.log(error);
        let statusCode = 500;
        let errorMessage = "Erro inesperado";

        if (error instanceof Error) {
            errorMessage = error.message;
            if (res.statusCode !== 200) {
                statusCode = res.statusCode;
            }
        }

        res.status(statusCode).send(errorMessage);
    }
}

export default createPurchase;