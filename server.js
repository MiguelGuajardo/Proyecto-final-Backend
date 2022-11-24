const bodyParser = require("body-parser");
const express = require("express")
const app = express()
const PORT = 8080;
const fs = require("fs")
const productsRoutes = require("./routes/products")
const cartsRoutes = require("./routes/carts")

/* ------------Creación de Archivos------------ */
if(!fs.existsSync("productos.json")){
    fs.writeFileSync("productos.json", JSON.stringify([]))
}
if(!fs.existsSync("carrito.json")){
    fs.writeFileSync("carrito.json", JSON.stringify([]))
}

/* ------------Middlewares------------ */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
/* ------------Routes------------ */
app.use("/api",productsRoutes,cartsRoutes)
/* ------------SERVER------------ */

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
  });
  server.on("error", (error) => console.log(`Error en servidor ${error}`));