export type TUsers = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string
}

export type TProducts = {
    id: string,
    name: string,
    price: number,
    description: string,
    imageUrl: string
}

export type TPurchases = {
    id: string,
    buyer: string,
    totalPrice: number,
    createdAt: string
}

export type TPurchasesProducts = {
    purchaseId: string,
    productId: string,
    quantity: number
}