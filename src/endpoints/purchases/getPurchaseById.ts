import { Request, Response } from 'express'
import { db } from '../../knex'
import { TProducts } from '../../types'

interface Purchase {
  purchaseId: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  totalPrice: number;
  createdAt: string;
  products: TProducts[];
}

const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const idToGet = req.params.id

    const [purchase] = await db("purchases").where({ id: idToGet })

    if (purchase) {
      const resultPurchase: Purchase = await db("purchases")
        .select(
          "purchases.id AS purchaseId",
          "purchases.buyer AS buyerId",
          "users.name AS buyerName",
          "users.email AS buyerEmail",
          "purchases.total_price AS totalPrice",
          "purchases.created_at AS createdAt"
        )
        .innerJoin(
          "users", "purchases.buyer", "=", "users.id"
        )
        .where({ "purchases.id": idToGet })
        .first()

      const purchaseProducts: TProducts[] = await db("purchases_products")
        .select(
          "products.id AS id",
          "products.name AS name",
          "products.price AS price",
          "products.description AS description",
          "products.image_url AS imageUrl",
          "purchases_products.quantity AS quantity"
        )
        .innerJoin(
          "products", "purchases_products.product_id", "=", "products.id"
        )
        .where({ "purchases_products.purchase_id": idToGet })

      const result: Purchase = {
        purchaseId: resultPurchase.purchaseId,
        buyerId: resultPurchase.buyerId,
        buyerName: resultPurchase.buyerName,
        buyerEmail: resultPurchase.buyerEmail,
        totalPrice: resultPurchase.totalPrice,
        createdAt: resultPurchase.createdAt,
        products: purchaseProducts
      }

      res.status(200).send(result)
    } else {
      res.status(404)
      throw new Error("'id' não encontrada")
    }
  } catch (error) {
    console.log(error);
    let statusCode = 500;
    let errorMessage = "Erro inesperado";

    if (error instanceof Error) {
      errorMessage = error.message;
      if (res.statusCode !== 200) {
        statusCode = res.statusCode;
      }
    }

    res.status(statusCode).send(errorMessage);
  }
}

export default getPurchaseById;
