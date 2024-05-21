import { Router } from "express";
import productController from "../../controller/product/index.js";


const productRouter = Router()

    //get all api
    productRouter.get("/product", productController.getAll)

    //get by id
    productRouter.get("/product/:id", productController.getId)

    //add product
    productRouter.post("/product", productController.addProduct)

    //update Stock
    productRouter.put("/product/:id", productController.update)

    //delete product
    productRouter.delete("/product/:id", productController.deleted)

    //update product price
    productRouter.put("/product/:id", productController.updatePrice)


    export default productRouter

