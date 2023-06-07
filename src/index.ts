import { users, products, createProduct, createUser, searchProductsByName } from "./database"
import { TUsers, TProducts } from "./types"
import express, {Request, Response} from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, ()=>{
    console.log("Servidor rodando na porta 3003")
})

app.get('/users', (req: Request, res: Response) => {
    res.status(200).send(users)
})

app.get('/products', (req: Request, res: Response)=>{
    const name = req.query.name as string

    if(name){
        const result: TProducts[] = products.filter((product)=>{
            return product.name.toLowerCase().includes(name.toLowerCase())
        })
        res.status(200).send(result)
    }else{
        res.status(200).send(products)
    }
})

app.post('/users', (req: Request, res: Response)=>{
    const id = req.body.id as string
    const name = req.body.name as string
    const email = req.body.email as string
    const password = req.body.password as string

    createUser(id, name, email, password)

    res.status(201).send('Cadastro realizado com sucesso')
})

app.post('/products', (req: Request, res: Response)=>{
    const id = req.body.id as string
    const name = req.body.name as string
    const price = req.body.price as number
    const description = req.body.description as string
    const imageUrl = req.body.imageUrl as string

    createProduct(id, name, price, description, imageUrl)

    res.status(201).send('Produto cadastrado com sucesso')
})
