import { pgTable, integer, varchar, timestamp, boolean, doublePrecision } from 'drizzle-orm/pg-core';
import { usersTable } from './userSchema'; // Assuming a users table is defined
import { productsTable } from './productSchema'; // Assuming a products table is defined
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

// Order Schema
export const ordersTable = pgTable('orders', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().references(() => usersTable.id).notNull(), // Foreign key to Users table
    status: varchar( { length: 50 }).default('New').notNull(), // E.g., 'pending', 'shipped', 'delivered'
    createdAt: timestamp().notNull().defaultNow(),
});

// OrderItem Schema
export const orderItemsTable = pgTable('order_items', {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    orderId: integer().references(() => ordersTable.id).notNull(), // Foreign key to Orders table
    productId: integer().references(() => productsTable.id).notNull(), // Foreign key to Products table
    quantity: integer().notNull(),
    price: doublePrecision( ).notNull(), // Price at the time of order
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
    id: true,
    userId: true,
    createdAt: true,
    status: true,
})

export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
    id:true,
    orderId: true,
    
})

export const insertOrderWithItemSchema = z.object({
    order: insertOrderSchema,
    items: z.array(insertOrderItemSchema),
})

export const updateOrderSchema = createInsertSchema(ordersTable).pick({
    status: true,
})
