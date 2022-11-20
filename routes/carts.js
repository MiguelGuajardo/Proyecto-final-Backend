const express = require("express")
const router = express.Router()

const {getCart,getProductToCart, addProductToCart, updateCart, deleteCart,deleteCartProduct} = require("../controllers/carts")

router
.get("/carrito", getCart)
.post("/carrito", addProductToCart)
.delete("/carrito/:id", deleteCart)
.get("/carrito/:id/productos", getProductToCart)
/*.put("/carrito/:id/productos", updateCart)
.delete("/carrito/:id/productos/:id_prod", deleteCartProduct) */

module.exports = router