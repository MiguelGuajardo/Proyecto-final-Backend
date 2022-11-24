const carts = require("../carrito.json")
const fs = require("fs")
module.exports = {
    getCart: (req,res)=>{
        const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
        if(cartResult.length === 0){
            res.json("No hay un Carrito Creado")
        }else{
            res.json(cartResult)
        }
   },
   getProductToCart: (req,res)=>{
    const {id} = req.params
    const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
    const oneCart = cartResult.find(element => element.id === Number(id))
    if(!oneCart){
        res.json("No se puede acceder a producto porque no existe el carrito buscado")
    }else{
        res.json(oneCart.productos)
    }
   },
   addProductToCartProducts: (req,res)=>{
    const {id} = req.params
    const {name,description,code,thumbnail,price,stock} = req.body
    const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
    const oneCart = cartResult.find(element =>element.id === Number(id))
    if(!oneCart){
        res.json("No se puede crear el producto porque no existe el carrito al cual se lo quiere insertar")
    }else{
        if(!name||!description||!code||!thumbnail||!price||!stock){
            res.json("Producto no encontrado")
        }else{
            let cartProducts = oneCart.productos
            let nuevoProducto = {
                id: cartProducts.length + 1,
                timestamp: new Date().toLocaleString(),
                name: name,
                description: description,
                code : code,
                thumbnail: thumbnail,
                price: price,
                stock: stock
            }
            cartProducts.push(nuevoProducto)
        }
    fs.writeFileSync("carrito.json", JSON.stringify(cartResult,null,2))
    res.json("recived")
    }
},
   addCart: (req,res)=>{
    const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
    let nuevoCarrito = {
        id: carts.length + 1,
        timestamp: new Date().toLocaleString(),
        productos: []
    }
    cartResult.push(nuevoCarrito)
    fs.writeFileSync("carrito.json", JSON.stringify(cartResult,null,2))
    res.json(`Carrito creado con id ${carts.length + 1}`)
},
    deleteCart: (req,res)=>{
        const {id} = req.params
        const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
        const oneCart = cartResult.find(element => element.id === Number(id))
        if(!oneCart){
            res.json("No se puede eliminar un carrito que no existe")
        }else{
            const resultado = cartResult.filter(element => element != oneCart)
            fs.writeFileSync("carrito.json", JSON.stringify(resultado,null,2))
            res.json("deleted")
        }
    },
    deleteCartProduct: (req,res)=>{
        const {id, id_prod} = req.params
        const cartResult  = JSON.parse(fs.readFileSync("carrito.json"))
        const oneCart = cartResult.find(element => element.id === Number(id))
        if(!oneCart){
            res.json("No se puede acceder al carrito")
        }else{
            let productos = oneCart.productos
            let oneProduct = productos.find(element => element.id === Number(id_prod))
                if(!oneProduct){
                    res.json("No se pudo eliminar un elemento que no existe")
                }else{
                    const resultado = productos.filter(element => element != oneProduct)
                    oneCart.productos = resultado
                    fs.writeFileSync("carrito.json", JSON.stringify(cartResult,null,2))
                   res.json("deleted")
                }
            }
        }
    }
