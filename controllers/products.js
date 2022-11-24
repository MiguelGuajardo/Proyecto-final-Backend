const products = require("../productos.json")
const admin = true;
const fs = require("fs")
const path = require("path")
const express = require("express")
const exphbs = require("express-handlebars");
const app = express()
/* Config */
app.set("views", path.join(__dirname, "views"))
app.engine(".hbs", exphbs.engine({
    extname:".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.join(app.get("views") + "layouts"),
    partialsDir: path.join(app.get("views") + "partials"),
}))
app.set("view engine",".hbs")

module.exports = {
    getProducts: (req,res)=>{
        const productsResult  = JSON.parse(fs.readFileSync("productos.json"))
        if(productsResult.length === 0){
            res.json("No hay productos cargados")
        }else{
            res.json(productsResult)
        }
   },
   addProduct: (req,res)=>{
    if(admin === true){
        const {name,description,code,thumbnail,price,stock} = req.body
        const productsResult  = JSON.parse(fs.readFileSync("productos.json"))
        if(!name||!description||!code||!thumbnail||!price||!stock){
            res.json("Producto no agregado")
            }else{
                let nuevoProducto = {
                    id: products.length + 1,
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
            }
            
}else{"Usted no esta autorizado"}},
    getOneProduct: (req,res)=>{
        const {id} = req.params
        const oneProduct = products.find(element => element.id === Number(id))
        if(!oneProduct){
            res.json("Producto inexistente")
        }
        res.json(oneProduct)
    },
    updateProduct: (req,res)=>{
        if(admin === true){
            const {id} = req.params
            const {name,description,code,thumbnail,price,stock} = req.body
            const productsResult  = JSON.parse(fs.readFileSync("productos.json"))
            const oneProduct = productsResult.find(element=> element.id === Number(id))
            if(!oneProduct){
                res.json("Producto inexistente")
            }else{
                if(!name||!description||!code||!thumbnail||!price||!stock){
                    res.json("Producto no agregado")
                    }else{
                        oneProduct.name = name
                        oneProduct.description = description
                        oneProduct.code = code
                        oneProduct.thumbnail = thumbnail
                        oneProduct.price = price
                        oneProduct.stock = stock
                    }
                }
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
            const oneProduct = productsResult.find(element=> element.id === Number(id))
            if(!oneProduct){
                res.json("Producto inexistente")
            }else{
                const resultado = productsResult.filter(element => element != oneProduct);
                fs.writeFileSync("productos.json", JSON.stringify(resultado,null,2))
                res.json("Deleted")
            }
        }else{
            res.json("Usted no esta autorizado")
        }
    }
}