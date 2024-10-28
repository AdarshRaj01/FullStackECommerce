import { Router } from "express";
import { createOrder } from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { insertOrderSchema, insertOrderWithItemSchema } from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";


const router =  Router();


//create order
router.post('/',verifyToken ,validateData(insertOrderWithItemSchema) ,createOrder)


//get the orders
//router.get('/', listOrders)





export default router
