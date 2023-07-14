# Projeto labecommerce (Backend)

#### O projeto consiste na criação de uma API vinculada a um banco de dados real.

Para realizar a modelagem desse banco de dados e das tabelas, considere a imagem a baixo.
Nela são mostradas as relações entre as tabelas :

![alt text](https://uploaddeimagens.com.br/images/004/544/331/original/labecommerce.png?1689295592 "Logo Title Text 1")

## Documentação do Postman
[Link da API no POSTMAN](https://documenter.getpostman.com/view/26594213/2s93sjT8SX)

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
`Cadastro realizado com sucesso`


