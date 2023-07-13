import { Request, Response } from 'express'
import { db } from '../../knex'


const deleteProductById =  async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [product] = await db("products").where({ id: idToDelete })

        if (!product) {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        await db("products").del().where({ id: idToDelete })

        res.status(200).send("Produto apagado com sucesso")
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

export default deleteProductById;