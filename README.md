# LABECOMMERCE-BACKEND

Esta é uma API de gerenciamento de um E-Commerce, onde você pode realizar operações como obter informações de todas os produtos ou algum produtos especifico, obter informações de usuarios cadastrados, excluir uma conta ou um produto e atualizar os detalhes de um produto existente.

A API suporta os seguintes endpoints:

1. POST /users: Cria um novo usuário com os seguintes campos obrigatórios: id, name, email e password. O campo id deve começar com a letra 'u'.
2. POST /products: Cria um novo produto com os seguintes campos obrigatórios: id, name, price, description e imageUrl. O campo id deve começar com a palavra 'prod'.
3. GET /users: Retorna todos os usuários cadastrados.
4. GET /products: Retorna todos os produtos cadastrados. É possível filtrar os produtos por nome usando o parâmetro de consulta name.
5. PUT /products/:id: Atualiza um produto existente com o ID fornecido. Os campos a serem atualizados devem ser enviados no corpo da solicitação. Os campos atualizáveis são: id, name, price, description e imageUrl.
6. DELETE /users/:id: Exclui o usuário com o ID fornecido. O ID deve começar com a letra 'u'.
7. DELETE /products/:id: Exclui o produto com o ID fornecido. O ID deve começar com a palavra 'prod'.

Certifique-se de fornecer os parâmetros corretos nos endpoints POST e PUT e os IDs válidos nos endpoints DELETE.

Observação: Esta é uma API de exemplo e não possui integração com um banco de dados real. Os dados são armazenados temporariamente na memória e serão redefinidos ao reiniciar o servidor.

[Link da API no POSTMAN](https://documenter.getpostman.com/view/26594213/2s93sjT8SX)
