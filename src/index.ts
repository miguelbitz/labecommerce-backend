import express from 'express'
import cors from 'cors'
import createUser from './endpoints/users/createUser'
import deleteUserById from './endpoints/users/deleteUserById'
import getAllUsers from './endpoints/users/getAllUsers'
import createProduct from './endpoints/products/createProduct'
import createPurchase from './endpoints/purchases/createPurchase'
import getAllProducts from './endpoints/products/getAllProducts'
import getPurchaseById from './endpoints/purchases/getPurchaseById'
import getAllPurchases from './endpoints/purchases/getAllPurchases'
import editProductById from './endpoints/products/editProductById'
import deleteProductById from './endpoints/products/deleteProductById'
import deletePurchaseById from './endpoints/purchases/deletePurchaseById'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//POST
app.post('/users', createUser)
app.post('/products', createProduct)
app.post('/purchases', createPurchase);

//GET
app.get('/users', getAllUsers)
app.get('/products', getAllProducts)
app.get('/purchases/:id', getPurchaseById)
app.get('/purchases', getAllPurchases)

//PUT
app.put("/products/:id", editProductById)

//DELETE
app.delete("/users/:id", deleteUserById)
app.delete("/products/:id", deleteProductById)
app.delete("/purchases/:id", deletePurchaseById)
