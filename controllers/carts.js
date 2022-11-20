const carts = require("../carrito.json")
const fs = require("fs")
module.exports = {
    getCart: (req,res)=>{
        res.json(carts)
   },
   getProductToCart: (req,res)=>{
    const {id} = req.params
    const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
    res.json(cartResult[id].productos)
   },
   addProductToCart: (req,res)=>{
    const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
    const productsResult  = JSON.parse(fs.readFileSync("productos.json"))
    let nuevoCarrito = {
        id: carts.length,
        timestamp: new Date().toLocaleString(),
        productos: productsResult
    }
    cartResult.push(nuevoCarrito)
    fs.writeFileSync("carrito.json", JSON.stringify(cartResult,null,2))
    res.json(`Carrito creado con id ${carts.length}`)
},
    deleteCart: (req,res)=>{
        const {id} = req.params
        const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
        cartResult.forEach((cart, i) => {
            if(cart.id === Number(id)){
                cartResult.splice(i,1)
            }
        });
        fs.writeFileSync("carrito.json", JSON.stringify(cartResult,null,2))
        res.json("deleted")
    }
}