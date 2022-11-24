const express = require("express")
const router = express.Router()

const {getProducts,getOneProduct, addProduct, updateProduct, deleteProduct} = require("../controllers/products")

router
.get("/productos", getProducts)
.get("/productos/:id", getOneProduct)
.post("/productos", addProduct)
.put("/productos/:id", updateProduct)
.delete("/productos/:id", deleteProduct)

module.exports = router