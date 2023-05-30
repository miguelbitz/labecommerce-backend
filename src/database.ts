import { TUsers, TProducts } from "./types"

export const users: TUsers[] = [
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
]

export const products: TProducts[] = [
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
]

//---------------------------------USER--------------------------------------
export const createUser = (id: string, name: string, email: string, password: string): void => {
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    }
    
    users.push(newUser)

    console.log("Cadastro realinado com sucesso")
}

export const getAllUsers = (): void => {
    console.table(users)
}




//----------------------------------PRODUCT----------------------------------
export const createProduct = (id: string, name: string, price: number, description : string, imageUrl: string): void => {
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl
    }
    
    products.push(newProduct)

    console.log("Produto criado com sucesso")
}

export const getAllProducts = (): void => {
    console.log(products)
}

export const searchProductsByName = (name:string): void =>{
    const filterProducts = products.filter((product)=>{
        return product.name.toLowerCase() === name.toLowerCase()
    })

    console.log(filterProducts)
}



