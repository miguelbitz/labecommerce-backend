import { Request, Response } from 'express'
import { db } from '../../knex'


const deletePurchaseById =  async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [purchase] = await db("purchases").where({ id: idToDelete })

        if (!purchase) {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        await db("purchases").del().where({ id: idToDelete })


        res.status(200).send("Pedido cancelado com sucesso")
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

export default deletePurchaseById;