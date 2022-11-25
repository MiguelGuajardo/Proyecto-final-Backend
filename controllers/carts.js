const fs = require("fs")
const path = require("path")
class Product {
    static file = path.join(__dirname, "carrito.json")
    constructor(name,description,code,thumbnail,price,stock) {
        this.name = name;
        this.description = description;
        this.code = code;
        this.thumbnail = thumbnail;
        this.price = price;
        this.stock = stock;
        this.timestamp;
        this.id;
      };
    }
class Cart {
    static file = path.join(__dirname, "carrito.json")
    constructor() {
        this.id;
        this.timestamp;
        this.productos;
      };
    static async getAll (){
        try {
            if(fs.existsSync(Cart.file)){
                const json = await fs.promises.readFile(Cart.file, "utf-8");
        const data = JSON.parse(json);
        return data
            }else{
                await fs.promises.writeFile(Cart.file, "[]", 'utf-8');
        console.log({ Msg: "Created file" });
        return []
            }
        } catch (error) {
            console.log(error)
        }
    }
    async saveCart(){
        try {
            const data = await Cart.getAll()
            this.id = data.length +1
            this.timestamp = new Date().toLocaleString()
            this.productos = []
            data.push(this)
            await fs.promises.writeFile(Cart.file, JSON.stringify(data,null,2),"utf-8")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    getCart: async (req,res)=>{
        const cartResult  = await Cart.getAll()
        if(cartResult.length === 0){
            res.json("No hay un Carrito Creado")
        }else{
            res.json(cartResult)
        }
   },
   getProductToCart: async (req,res)=>{
    const {id} = req.params
    const cartResult  = await Cart.getAll()
    const oneCart = cartResult.find(element => element.id === Number(id))
    if(!oneCart){
        res.json("No se puede acceder a producto porque no existe el carrito buscado")
    }else{
        res.json(oneCart.productos)
    }
   },
   addProductToCartProducts: async (req,res)=>{
    const {id} = req.params
    const {name,description,code,thumbnail,price,stock} = req.body
    const cartResult  = await Cart.getAll()
    const oneCart = cartResult.find(element =>element.id === Number(id))
    if(!oneCart){
        res.json("No se puede crear el producto porque no existe el carrito al cual se lo quiere insertar")
    }else{
        if(!name||!description||!code||!thumbnail||!price||!stock){
            res.json("Producto no encontrado")
        }else{
            let cartProducts = oneCart.productos
            const id = cartProducts.length + 1
            let timestamp = new Date().toLocaleString()
            let nuevoProducto = new Product(name,description,code,thumbnail,price,stock)
            nuevoProducto.id = id
            nuevoProducto.timestamp = timestamp
            cartProducts.push(nuevoProducto)
        }
    fs.writeFileSync(Cart.file, JSON.stringify(cartResult,null,2))
    res.json("recived")
    }
},
   addCart: async (req,res)=>{
    const cartResult  = await Cart.getAll() 
    let nuevoCarrito = new Cart()
    await nuevoCarrito.saveCart()
    res.json(`Carrito creado con id ${cartResult.length + 1}`)
},
    deleteCart: async (req,res)=>{
        const {id} = req.params
        const cartResult  = await Cart.getAll()
        const oneCart = cartResult.find(element => element.id === Number(id))
        if(!oneCart){
            res.json("No se puede eliminar un carrito que no existe")
        }else{
            const resultado = cartResult.filter(element => element != oneCart)
            fs.writeFileSync(Cart.file, JSON.stringify(resultado,null,2))
            res.json("deleted")
        }
    },
    deleteCartProduct: async (req,res)=>{
        const {id, id_prod} = req.params
        const cartResult  = await Cart.getAll()
        const oneCart = cartResult.find(element =>element.id === Number(id))
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
                    fs.writeFileSync(Cart.file, JSON.stringify(cartResult,null,2))
                   res.json("deleted")
                }
            }
        }
    }
