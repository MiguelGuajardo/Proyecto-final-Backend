const admin = true;
const fs = require("fs")
const path = require("path")

class Product {
    static file = path.join(__dirname, "productos.json")
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
    static async getAll (){
        try {
            if(fs.existsSync(Product.file)){
                const json = await fs.promises.readFile(Product.file, "utf-8");
        const data = JSON.parse(json);
        return data
            }else{
                await fs.promises.writeFile(Product.file, "[]", 'utf-8');
        console.log({ Msg: "Created file" });
        return []
            }
        } catch (error) {
            console.log(error)
        }
    }
    async save(){
        try {
            const data = await Product.getAll()
            this.id = data.length + 1
            this.timestamp = new Date().toLocaleString()
            data.push(this)
            await fs.promises.writeFile(Product.file,JSON.stringify(data,null,2), "utf-8")
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    getProducts: async (req,res)=>{
        const productsResult  = await Product.getAll()
        console.log(productsResult)
        if(productsResult.length === 0){
            res.json("No hay productos cargados")
        }else{
            res.json(productsResult)
        }
   },
   
   addProduct: async (req,res)=>{
    if(admin === true){
        const {name,description,code,thumbnail,price,stock} = req.body
        if(!name||!description||!code||!thumbnail||!price||!stock){
            res.json("Producto no agregado")
            }else{
                const nuevoProducto = new Product(name,description,code,thumbnail,price,stock)
                await nuevoProducto.save()
       res.json("recived")
            }
            
}else{"Usted no esta autorizado"}},
    getOneProduct: async (req,res)=>{
        const {id} = req.params
        const productsResult  = await Product.getAll()
        const oneProduct = productsResult.find(element => element.id === Number(id))
        if(!oneProduct){
            res.json("Producto inexistente")
        }
        res.json(oneProduct)
    },
    updateProduct: async (req,res)=>{
        if(admin === true){
            const {id} = req.params
            const {name,description,code,thumbnail,price,stock} = req.body
            const productsResult  = await Product.getAll()
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
                fs.writeFileSync(Product.file, JSON.stringify(productsResult,null,2))
                res.json("Updated")
        }else{
            res.json("Usted no esta autorizado")
            }
    },
    deleteProduct: async (req,res)=>{
        if(admin === true){
            const {id} = req.params
            const productsResult  = await Product.getAll()
            const oneProduct = productsResult.find(element=> element.id === Number(id))
            if(!oneProduct){
                res.json("Producto inexistente")
            }else{
                const resultado = productsResult.filter(element => element != oneProduct);
                fs.writeFileSync(Product.file, JSON.stringify(resultado,null,2))
                res.json("Deleted")
            }
        }else{
            res.json("Usted no esta autorizado")
        }
    }
}