import { Router } from "express";
import { createProduct, deleteProduct, getProductbyId, listProducts, updateProduct } from "./productController";
import { validateData } from "../../middlewares/validationMiddleware";
import {z} from 'zod'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { createProductSchema, productsTable, updateProductSchema } from "../../db/productSchema";


// const createProductSchema = z.object({
//     name:z.string(),
//     description:z.string(),
//     price:z.number(),
// })


const router =  Router();

//Define routes

//get all products
router.get('/',listProducts)

//get a product by id
router.get('/:id', getProductbyId)

//post a new product
router.post('/',validateData(createProductSchema),createProduct)

//update a product
router.put('/:id', validateData(updateProductSchema),updateProduct)

//delete a product
router.delete('/:id', deleteProduct)




export default router
