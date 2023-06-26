-- Active: 1687820047226@@127.0.0.1@3306

-- criando tabela users
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

-- visuzalizar tabela users
SELECT * FROM users;

-- adicionando usuario na tabela
INSERT INTO users (id, name, email, password, created_at)
VALUES ('u001', 'Miguel','miguel@gamil.com','miguel123', CURRENT_TIMESTAMP);

-- criando tabela products
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- visuzalizar tabela products
SELECT * FROM products;

-- adicionando usuario na tabela
INSERT INTO products (id, name, price, description, image_url)
VALUES ('prod005', 'Gabinete', 2000 ,'Melhor gabinete do mercado', 'https://picsum.photos/seed/Gabinete/400');