import { Request, Response } from 'express'
import { db } from '../../knex'


const editProductById =  async (req: Request, res: Response) => {
    try {
        const idToEdit = req.params.id

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

        const [product] = await db("products").where({ id: idToEdit })

        if (product) {
            const updatedProduct = {
                id: newId || product.id,
                name: newName || product.name,
                price: newPrice || product.price,
                description: newDescription || product.description,
                image_url: newImageUrl || product.imageUrl
            }

            await db("products").update(updatedProduct).where({ id: idToEdit })

        } else {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        res.status(200).send("Produto atualizado com sucesso")
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

export default editProductById;