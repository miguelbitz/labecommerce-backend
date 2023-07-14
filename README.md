# Projeto labecommerce (Backend)

#### O projeto consiste na criação de uma API vinculada a um banco de dados real.

Para realizar a modelagem desse banco de dados e das tabelas, considere a imagem a baixo.
Nela são mostradas as relações entre as tabelas :

![alt text](https://uploaddeimagens.com.br/images/004/544/331/original/labecommerce.png?1689295592 "Logo Title Text 1")

## Tecnologias
O projeto aborda as seguintes ferramentas:

* Node.js
* Typescript
* Express
* SQL e SQLite
* Knex
* Postman

## Caminho das Requisições (Paths)
### Requisições de Usuários:
* /users
### Requisições de Produtos:
* /products
### Requisições de Compras:
* /purchases

## Exemplo de Requisições
### Requisições de usuários
`GET /users`: Retorna todos usuários cadastrados
```javascript
[
    {
        "id": "u001",
        "name": "Miguel",
        "email": "miguel@gamil.com",
        "password": "miguel123",
        "created_at": "2023-07-13 22:48:04"
    },
    {
        "id": "u002",
        "name": "Giovana",
        "email": "gicalinda@123",
        "password": "1234",
        "created_at": "13/07/2023, 19:51:52"
    },
    {
        "id": "u003",
        "name": "Jota",
        "email": "joao@123",
        "password": "1234",
        "created_at": "13/07/2023, 19:52:03"
    },
    {
        "id": "u004",
        "name": "Fulano",
        "email": "fulano@123",
        "password": "1234",
        "created_at": "13/07/2023, 19:54:37"
    }
]
```
`POST /users`: Cadastra novo usuario
```javascript
{
    "id":"u005",
    "name": "Ciclano",
    "email": "ciclano@123",
    "password": "1234"
}
```
```
{
    Cadastro realizado com sucesso
}
```

`DELETE /users/:id`: Deleta usuário pela ID.

```
{
    User apagado com sucesso
}
```

### Requisições de produtos
`GET /products`: Retorna todos produtos cadastrados
```javascript
[
    {
        "id": "prod001",
        "name": "Mouse Gamer Wireless Top",
        "price": 250,
        "description": "Melhor mouse do mercado",
        "image_url": "undefined"
    },
    {
        "id": "prod002",
        "name": "Monitor",
        "price": 900,
        "description": "Melhor monitor do mercado",
        "image_url": "https://picsum.photos/seed/Monitor/400"
    },
    {
        "id": "prod003",
        "name": "Teclado games",
        "price": 500,
        "description": "Melhor teclado do mercado",
        "image_url": "https://picsum.photos/seed/Teclado/400"
    }
]
```
`POST /products`: Cadastra novo produto
```javascript
{
    "id":"prod009",
    "name": "Webcam 1080p",
    "price": 279.99,
    "description": "Full hd",
    "imageUrl": "https://picsum.photos/seed/Webcam/400"
}
```
```
{
    Produto cadastrado com sucesso
}
```

`DELETE /products/:id`: Deleta produto pela ID.

```
{
    Produto apagado com sucesso
}
```

`PUT /products/:id`: Edita produto pela ID
```javascript
{
    "name": "Pendrive USB3.0 2023"
}
```
```
{
    Produto atualizado com sucesso
}
```

### Requisições de compras
`GET /purchases/:id`: Retorna compra pelo ID
```javascript
{
    "purchaseId": "pur001",
    "buyerId": "u004",
    "buyerName": "Fulano",
    "buyerEmail": "fulano@123",
    "totalPrice": 6000,
    "createdAt": "2023-07-08 23:31:48",
    "products": [
        {
            "id": "prod001",
            "name": "Mouse Gamer Wireless Top",
            "price": 250,
            "description": "Melhor mouse do mercado",
            "imageUrl": "undefined",
            "quantity": 1
        }
    ]
}
```
`GET /purchases/`: Retorna todas as compras
```javascript
[
    {
        "purchaseId": "pur001",
        "buyerId": "u004",
        "buyerName": "Fulano",
        "buyerEmail": "fulano@123",
        "totalPrice": 6000,
        "createdAt": "2023-07-08 23:31:48"
    },
    {
        "purchaseId": "pur002",
        "buyerId": "u004",
        "buyerName": "Fulano",
        "buyerEmail": "fulano@123",
        "totalPrice": 2500,
        "createdAt": "2023-07-12 21:56:32"
    }
]
```
`POST /purchases`: Cadastra nova compra
```javascript
{
    "id": "pur002",
    "buyer": "u002",
    "products": [
        {
            "id": "prod001",
            "quantity": 1
        },
        {
            "id": "prod003",
            "quantity": 1
        }
    ]
}
```
```
{
    Compra adicionada com sucesso
}
```

`DELETE /purchases/:id`: Deleta compra pelo ID

```
{
    Pedido cancelado com sucesso
}
```
## Documentação do Postman
[Link da API no POSTMAN](https://documenter.getpostman.com/view/26594213/2s93sjT8SX)

# Criado por:
## Miguel Alves
![alt text](https://uploaddeimagens.com.br/images/004/544/373/original/imagem_pq.png?1689299009  "Logo Title Text 1" )



