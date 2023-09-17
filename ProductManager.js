import fs from 'fs'

const path = 'products.json'

class ProductsManager {
    async getProducts(queryObj){
        const {limit} = queryObj
        try {
            if(fs.existsSync(path)){
                const productsFile = await fs.promises.readFile(path, "utf-8");
                const productsArray = JSON.parse(productsFile)
                return limit ? productsArray.slice(0,limit) : productsArray
            } else{
                return[]
            }
        } catch (error) {
            return error;
        }

    }
    async getProductBiId(id){
        try {
            if(fs.existsSync(path)){
                const productsFile = await this.getProducts({})
                const product = productsFile.find(p=>p.id===id)
                return product
            }else{
                return[]
            }
        } catch (error) {
            return error;
        }
    }
    async createProduct(obj){
        try {
            const products = await this.getProducts({})
            let id
            if (!products.length){
                id=1
            } else{
                id = products[products.length - 1].id + 1
            }
            const newProduct = { id, ...obj }
            products.push(newProduct)
            await fs.promises.writeFile(path, JSON.stringify(products))
            return newProduct
        } catch (error) {
            return error
        }
    }
}

const product1 = {
    name: 'bondiola',
    price: 3500 
};
const product2 = {
    name: 'panceta',
    price: 1500 
};
const product3 = {
    name: 'jamon cocido',
    price: 2500 
};
const product4 = {
    name: 'jamon crudo',
    price: 3000 
};
const product5 = {
    name: 'bresaloa',
    price: 4500 
};

//async function test() {
//const productManager = new ProductsManager()
//await productManager.createProduct(product1)
//await productManager.createProduct(product2)
//await productManager.createProduct(product3)
//await productManager.createProduct(product4)
//await productManager.createProduct(product5)
//}

//test()


export const productManager = new ProductsManager();