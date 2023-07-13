-- Active: 1687820047226@@127.0.0.1@3306
------------------------------USERS-----------------------------
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

-- deletar usuario pela ID
DELETE FROM users
WHERE id = '';

----------------------------PRODUTOS----------------------------
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

-- visualizar tabela products com include()
SELECT * FROM products
WHERE name LIKE '%gamer%';

-- adicionando usuario na tabela
INSERT INTO products (id, name, price, description, image_url)
VALUES ('prod006', 'PC gamer', 6000 ,'Melhor PC do mercado', 'https://picsum.photos/seed/Pc/400');

-- deletar produto pela ID
DELETE FROM products
WHERE id = '';

-- editar produto
UPDATE products
SET 
    id = '',
    name = '',
    price = NULL,
    description = '',
    image_url = ''
WHERE id = '';

----------------------------COMPRAS----------------------------

--criando tabelas purchases
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT NOT NULL,

    FOREIGN KEY (buyer) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

SELECT * FROM purchases;

INSERT INTO purchases (id, buyer, total_price, created_at)
VALUES
('p004', 'u001', 10000, CURRENT_TIMESTAMP);

UPDATE purchases
SET buyer = 'u002'
WHERE id = 'p004';

SELECT 
    purchases.id,
    purchases.buyer,
    users.name,
    users.email,
    purchases.total_price,
    purchases.created_at
FROM purchases
INNER JOIN  users
ON purchases.buyer = users.id;

------------------------TABELA DE RELACOES----------------------

CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ('pur004', 'prod004', 1);

SELECT 
    purchases.id AS purchaseId,
    purchases.buyer AS buyer,
    purchases.total_price AS totalPrice,
    purchases.created_at AS purchaseDate,
    purchases_products.product_id AS productId,
    purchases_products.quantity AS quantity,
    products.name AS productName,
    products.price AS productPrice
FROM purchases
INNER JOIN purchases_products
ON purchases_products.purchase_id = purchases.id
INNER JOIN products
ON purchases_products.product_id = products.id;

SELECT * FROM purchases_products;

SELECT * FROM products;

DROP TABLE purchases;

DROP TABLE purchases_products;