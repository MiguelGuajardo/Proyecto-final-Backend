const products = require("../productos.json")
const admin = true;
const fs = require("fs")
module.exports = {
    getProducts: (req,res)=>{
        res.json(products)
   },
   addProduct: (req,res)=>{
    if(admin === true){
        const {name,description,code,thumbnail,price,stock} = req.body
        const productsResult  = JSON.parse(fs.readFileSync("productos.json"))
        let nuevoProducto = {
            id: products.length,
            timestamp: new Date().toLocaleString(),
            name: name,
            description: description,
            code : code,
            thumbnail: thumbnail,
            price: price,
            stock: stock
        }
        productsResult.push(nuevoProducto)
        fs.writeFileSync("productos.json", JSON.stringify(productsResult,null,2))
   res.json("recived")
}else{
    res.json("Usted no esta autorizado")
    }
},
    getOneProduct: (req,res)=>{
        const {id} = req.params
        products.forEach((product, i)=>{
            if(product.id === Number(id)){
                res.json(product)
            }
        })
    },
    updateProduct: (req,res)=>{
        if(admin === true){
            const {id} = req.params
            const {name,description,code,thumbnail,price,stock} = req.body
            const productsResult  = JSON.parse(fs.readFileSync("productos.json"))
            productsResult.forEach((product, i)=>{
            if(product.id === Number(id)){
                product.name = name
                product.description = description
                product.code = code
                product.thumbnail = thumbnail
                product.price = price
                product.stock = stock
            }
        })
        fs.writeFileSync("productos.json", JSON.stringify(productsResult,null,2))
        res.json("Updated")
        }else{
            res.json("Usted no esta autorizado")
            }
    },
    deleteProduct: (req,res)=>{
        if(admin === true){
            const {id} = req.params
            const productsResult  = JSON.parse(fs.readFileSync("productos.json"))
            productsResult.forEach((product, i)=>{
                if(product.id === Number(id)){
                    productsResult.splice(i, 1)
                }
            })
            fs.writeFileSync("productos.json", JSON.stringify(productsResult,null,2))
            res.json("Deleted")
        }else{
            res.json("Usted no esta autorizado")
        }
    }
}