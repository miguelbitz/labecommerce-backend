import { Request, Response } from 'express'
import { db } from '../../knex'


const deleteUserById =  async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id

        const [user] = await db("users").where({ id: idToDelete })

        if (!user) {
            res.status(404)
            throw new Error("'id' não encontrada")
        }

        await db("users").del().where({ id: idToDelete })

        res.status(200).send("User apagado com sucesso")
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

export default deleteUserById;