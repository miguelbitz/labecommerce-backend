import { Request, Response } from 'express'
import { db } from '../../knex'


const createProduct =  async (req: Request, res: Response) => {
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

        const existingProduct = await db("products").where({ id }).first();
        if (existingProduct) {
            res.status(400);
            throw new Error("ID já cadastrado");
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

        const newProduct = {
            id,
            name,
            price,
            description,
            image_url: imageUrl
        }

        await db("products").insert(newProduct)

        res.status(201).send('Produto cadastrado com sucesso')
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

export default createProduct;