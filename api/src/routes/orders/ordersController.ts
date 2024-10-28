import { Request, Response } from "express";
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";
import { db } from "../../db";

export async function createOrder(req:Request, res:Response){
    try {
        console.log(req.cleanBody)
        const {order, items} = req.cleanBody
        const userId = req.userId;
        console.log(userId)
        if(!userId) {
            res.status(500).send('Error in creating order1')
            return 

        }
        const [newOrder] = await db.insert(ordersTable).values({userId:Number(userId)}).returning()

        const orderItems = items.map((item:any)=>({
            ...item,
            orderId: newOrder.id,
        }))

        const newOrderItems = await db.insert(orderItemsTable).values(orderItems).returning()

        res.status(201).json({...newOrder, items:newOrderItems})

        console.log('order' + {order})
    } catch (error) {
        console.log(error)
        res.status(500).send('Error in creating order')
    }
}