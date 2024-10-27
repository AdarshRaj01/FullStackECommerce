import { Router } from "express";
import { createProduct, deleteProduct, getProductbyId, listProducts, updateProduct } from "./productController";
import { validateData } from "../../middlewares/validationMiddleware";
import { createProductSchema, updateProductSchema } from "../../db/productSchema";
import { verifySeller, verifyToken } from "../../middlewares/authMiddleware";


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
router.post('/',verifyToken, verifySeller, validateData(createProductSchema),createProduct)

//update a product
router.put('/:id',verifyToken, verifySeller, validateData(updateProductSchema),updateProduct)

//delete a product
router.delete('/:id',verifyToken, verifySeller, deleteProduct)




export default router
