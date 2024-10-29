import { Request, Response } from "express";
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";
import { db } from "../../db";
import { eq } from "drizzle-orm";

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

export async function listUsersOrders(req:Request, res:Response){
    try {
        const userId = req.userId;
        if(!userId) {
            res.status(500).send('Error in getting orders')
            return 
        }
        const orders = await db.select().from(ordersTable).where(eq(ordersTable.userId, Number(userId)))
        res.status(201).json(orders)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error in getting orders')
    }
}

export async function getOrderWithItems(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);

        // Fetch the order and its related order items
        const orderWithItems = await db.select()
            .from(ordersTable)
            .leftJoin(orderItemsTable, eq(orderItemsTable.id, ordersTable.id))
            .where(eq(ordersTable.id, id));

        if (!orderWithItems.length) {
            res.status(404).json({ message: "Order not found" });
            return
        }

        // Organize the data to group items under the order
        const formattedOrder = {
            ...orderWithItems[0].orders,
            items: orderWithItems.map(item => item.order_items)
        };

        res.status(200).json(formattedOrder);
    } catch (error) {
        console.error("Error retrieving order with items:", error);
        res.status(500).send("Error retrieving order with items");
    }
}

export async function updateOrder(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
  
      const [updatedOrder] = await db
        .update(ordersTable)
        .set(req.body)
        .where(eq(ordersTable.id, id))
        .returning();
  
      if (!updatedOrder) {
        res.status(404).send('Order not found');
      } else {
        res.status(200).json(updatedOrder);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }