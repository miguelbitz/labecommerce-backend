"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
    {
        id: "u001",
        name: "Miguel",
        email: "miguel@gamil.com",
        password: "miguel123",
        createdAt: new Date().toISOString()
    },
    {
        id: "u002",
        name: "Giovana",
        email: "gica@gamil.com",
        password: "gica123",
        createdAt: new Date().toISOString()
    }
];
exports.products = [
    {
        id: "prod001",
        name: "Mouse gamer",
        price: 250,
        description: "Melhor mouse do mercado!",
        imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400"
    },
    {
        id: "prod002",
        name: "Monitor",
        price: 900,
        description: "Monitor LED Full HD 24 polegadas",
        imageUrl: "https://picsum.photos/seed/Monitor/400"
    }
];
const createUser = (id, name, email, password) => {
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    exports.users.push(newUser);
    console.log("Cadastro realinado com sucesso");
};
exports.createUser = createUser;
const getAllUsers = () => {
    console.table(exports.users);
};
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, price, description, imageUrl) => {
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    };
    exports.products.push(newProduct);
    console.log("Produto criado com sucesso");
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    console.log(exports.products);
};
exports.getAllProducts = getAllProducts;
const searchProductsByName = (name) => {
    const filterProducts = exports.products.filter((product) => {
        return product.name.toLowerCase() === name.toLowerCase();
    });
    console.log(filterProducts);
};
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map