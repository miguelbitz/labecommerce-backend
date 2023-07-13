import { Request, Response } from 'express'
import { db } from '../../knex'

const createUser = async (req: Request, res: Response) => {
    try {
        const { id, name, email, password } = req.body

        if (id[0] !== "u") {
            res.status(400)
            throw new Error("Id invalido. Deve iniciar com letra 'u'")
        }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("'id' deve ser uma string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("'name' deve ser uma string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("'email' deve ser uma string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("'password' deve ser uma string")
        }

        const existingUser = await db("users").where({ id }).first();
        if (existingUser) {
            res.status(400);
            throw new Error("ID já cadastrado");
        }

        const existingEmail = await db("users").where({ email }).first();
        if (existingEmail) {
            res.status(400);
            throw new Error("Email já cadastrado");
        }

        const newUser = {
            id,
            name,
            email,
            password,
            created_at: new Date().toLocaleString()
        }

        await db("users").insert(newUser)

        res.status(201).send('Cadastro realizado com sucesso')
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

export default createUser;