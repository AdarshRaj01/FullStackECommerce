import { Router } from "express";
import { createProduct, deleteProduct, getProductbyId, listProducts, updateProduct } from "./productController";

const router =  Router();

//Define routes

//get all products
router.get('/',listProducts)

//get a product by id
router.get('/:id', getProductbyId)

//post a new product
router.post('/',createProduct)

//update a product
router.put('/:id', updateProduct)

//delete a product
router.delete('/:id', deleteProduct)




export default router
