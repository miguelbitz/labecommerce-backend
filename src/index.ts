import { users, products, createProduct, createUser, searchProductsByName } from "./database"
import { TUsers, TProducts } from "./types"
import express, {application, Request, Response} from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, ()=>{
    console.log("Servidor rodando na porta 3003")
})

//POST
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

//GET
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

//PUT
app.put("/products/:id", (req: Request, res: Response)=>{
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newDescription = req.body.description as string | undefined
    const newImageUrl = req.body.imageUrl as string | undefined

    const findProduct = products.find((product)=> product.id === id)

    if(findProduct){
        findProduct.id = newId || findProduct.id
        findProduct.name = newName || findProduct.name
        findProduct.price = newPrice || findProduct.price
        findProduct.description = newDescription || findProduct.description
        findProduct.imageUrl = newImageUrl || findProduct.imageUrl
    }

    res.status(200).send("Produto atualizado com sucesso")
})

//DELETE
app.delete("/users/:id", (req: Request, res: Response)=>{
    const id = req.params.id

    const userIndex = users.findIndex((user)=>user.id === id)

    if(userIndex >= 0){
        users.splice(userIndex, 1)
    }

    res.status(200).send("User apagado com sucesso")
})

app.delete("/products/:id", (req: Request, res: Response)=>{
    const id = req.params.id

    const productIndex = products.findIndex((product)=>product.id === id)

    if(productIndex >= 0){
        products.splice(productIndex, 1)
    }

    res.status(200).send("Produto apagado com sucesso")
})
