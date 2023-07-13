import { Request, Response } from 'express'
import { db } from '../../knex'


const getAllProducts = async (req: Request, res: Response) => {
    try {
        const name = req.query.name as string

        if (name) {
            const result = await db("products")
            .select()
            .where("name","LIKE",`%${name}%`)
            res.status(200).send(result)
        } else {
            const result = await db("products").select()

            res.status(200).send(result)
        }
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

export default getAllProducts;