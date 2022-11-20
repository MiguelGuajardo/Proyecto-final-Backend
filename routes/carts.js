const express = require("express")
const router = express.Router()

const {getCart,addCart, getProductToCart,addProductToCartProducts,deleteCart,deleteCartProduct} = require("../controllers/carts")

router
.post("/carrito", addCart)
.delete("/carrito/:id", deleteCart)
.get("/carrito", getCart)
.get("/carrito/:id/productos", getProductToCart)
.post("/carrito/:id/productos", addProductToCartProducts)
.delete("/carrito/:id/productos/:id_prod", deleteCartProduct)

module.exports = router