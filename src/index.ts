import { users, products, createProduct, createUser, getAllProducts, getAllUsers, searchProductsByName } from "./database"

createUser("u003", "Jota", "jota@123", "jotinha")

getAllUsers()

createProduct("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://picsum.photos/seed/Teclado/400")

getAllProducts()

searchProductsByName("ssd gamer")