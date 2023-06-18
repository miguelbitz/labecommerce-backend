"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.post('/users', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    (0, database_1.createUser)(id, name, email, password);
    res.status(201).send('Cadastro realizado com sucesso');
});
app.post('/products', (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    (0, database_1.createProduct)(id, name, price, description, imageUrl);
    res.status(201).send('Produto cadastrado com sucesso');
});
app.get('/users', (req, res) => {
    res.status(200).send(database_1.users);
});
app.get('/products', (req, res) => {
    const name = req.query.name;
    if (name) {
        const result = database_1.products.filter((product) => {
            return product.name.toLowerCase().includes(name.toLowerCase());
        });
        res.status(200).send(result);
    }
    else {
        res.status(200).send(database_1.products);
    }
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const userIndex = database_1.users.findIndex((user) => { user.id === id; });
    if (userIndex >= 0) {
        database_1.users.splice(userIndex, 1);
    }
    res.status(200).send("User apagado com sucesso");
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const productIndex = database_1.products.findIndex((product) => { product.id === id; });
    if (productIndex >= 0) {
        database_1.products.splice(productIndex, 1);
    }
    res.status(200).send("Produto apagado com sucesso");
});
//# sourceMappingURL=index.js.map