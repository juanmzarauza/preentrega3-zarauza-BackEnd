import  express from "express"
import { productManager } from './productManager.js'

const app = express ()

app.get ('/api/products',async(req,res)=>{
    try {
        const products = await productManager.getProducts(req.query)
        if(!products.length){
            return res.status(200).json({ message:"no hay productos" })
        }
        res.status(200).json({message: "Products found", products})
    } catch (error) {
        req.status(500).json({message:error.message})
    }
})

app.get ('/api/products/:idProducts', async(req,res)=>{
    const {idProducts} = req.params
    try {
        const product = await productManager.getProductBiId(+idProducts)
        if(!product){
            return res.status(400).json({message: "product no found with the id"})
        }
        res.status(200).json({message: "Product found", product})
    } catch (error) {
        
    }
})
app.listen(8080,()=>{
    console.log('escuchando al puerto 8080')
})
