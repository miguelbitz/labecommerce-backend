import { Request, Response } from 'express'
import { db } from '../../knex'


const getAllPurchases = async (req: Request, res: Response) => {
    try {
        const result = await db("purchases")
            .select(
                "purchases.id AS purchaseId",
                "purchases.buyer AS buyerId",
                "users.name AS buyerName",
                "users.email AS buyerEmail",
                "purchases.total_price AS totalPrice",
                "purchases.created_at AS createdAt"
            )
            .innerJoin(
                "users", "purchases.buyer", "=", "users.id"
            )

        res.status(200).send(result)
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

export default getAllPurchases;