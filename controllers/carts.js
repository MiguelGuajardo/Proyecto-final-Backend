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
   addProductToCartProducts: (req,res)=>{
    const {id} = req.params
    const {name,description,code,thumbnail,price,stock} = req.body
    const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
    let cartProducts = cartResult[id].productos
    let nuevoProducto = {
        id: cartProducts.length,
        timestamp: new Date().toLocaleString(),
        name: name,
        description: description,
        code : code,
        thumbnail: thumbnail,
        price: price,
        stock: stock
    }
    cartProducts.push(nuevoProducto)
    fs.writeFileSync("carrito.json", JSON.stringify(cartResult,null,2))
    res.json("recived")
},
   addCart: (req,res)=>{
    const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
    let nuevoCarrito = {
        id: carts.length,
        timestamp: new Date().toLocaleString(),
        productos: []
    }
    cartResult.push(nuevoCarrito)
    fs.writeFileSync("carrito.json", JSON.stringify(cartResult,null,2))
    res.json(`Carrito creado con id ${carts.length}`)
},
    addProductToCart: (req,res)=>{
        const {id} = req.params
    const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
    let productToCart = cartResult[id].productos
    console.log(productToCart)
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
    },
    deleteCartProduct: (req,res)=>{
        const {id, id_prod} = req.params
        const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
        let cartProducts = cartResult[id].productos
        cartProducts.forEach((cartProduct, i)=>{
             if(cartProduct.id === Number(id_prod)){
                cartProducts.splice(i, 1)
            }
        })
         fs.writeFileSync("carrito.json", JSON.stringify(cartResult,null,2))
        res.json("deleted")
    }
}