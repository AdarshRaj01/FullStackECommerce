import { Router } from "express";
import { createOrder , getOrderWithItems, listUsersOrders, updateOrder} from "./ordersController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { insertOrderSchema, insertOrderWithItemSchema, updateOrderSchema } from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";


const router =  Router();


//create order
router.post('/',verifyToken ,validateData(insertOrderWithItemSchema) ,createOrder)


//get the orders
router.get('/',verifyToken, listUsersOrders)

//get orders by id
router.get('/:id',verifyToken, getOrderWithItems)

//update order
router.put('/:id',verifyToken, validateData(updateOrderSchema), updateOrder)





export default router
