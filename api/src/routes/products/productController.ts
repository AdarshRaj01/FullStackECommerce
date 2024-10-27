import { Request, Response } from "express";
import { db } from "../../db/index.js";
import { productsTable } from "../../db/productSchema.js";
import { eq } from "drizzle-orm";
import _ from 'lodash'; 


export async function listProducts(req:Request, res:Response){
    try {
        const allProducts = await db.select().from(productsTable);
        res.status(201).json(allProducts)
    } catch (error) {
        res.status(500).send('Error in retrieving products')
    }
}



export async function getProductbyId1(req:Request, res:Response){
    try {
        const id = Number(req.params.id);
        const [product] = await db.select().from(productsTable).where(eq(productsTable.id, id));

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }
          res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message:"Error in retrieving product"})
    }

}

export async function getProductbyId(req: Request, res: Response): Promise<void> {
    try {
        const id = Number(req.params.id);

        // Fetch the product based on ID
        const product = await db.select().from(productsTable).where(eq(productsTable.id, id)).limit(1);

        // If no product is found, return a 404 error
        if (product.length === 0) {
            res.status(404).json({ message: 'Product not found' });
        }

        // Respond with the found product (return the first item as a single object)
        res.status(200).json(product[0]);
    } catch (error) {
        console.error("Error retrieving product:", error);
        res.status(500).json({ message: "Error in retrieving product" });
    }
}


export async function createProduct(req:Request, res:Response){
    try {
        console.log(req.userId)

        const body = req.body;
        const [newProduct] = await db.insert(productsTable).values(req.cleanBody).returning()
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in creating product');
        
    }


}

export async function updateProduct(req:Request, res:Response){
    try {
        const id = Number(req.params.id);
        
        const updatedData = req.cleanBody;
        const [updatedProduct] = await db.update(productsTable).set(updatedData).where(eq(productsTable.id,id)).returning()

        if (updatedProduct) {
            res.json(updatedProduct);

        }
        else
            res.status(404).send({ message: 'Product not found' });



    } catch (error) {
        console.error(error);
        res.status(500).send('Error in updating product');
        
    }
}

export async function deleteProduct(req:Request, res:Response){
    try {
        const id = Number(req.params.id);
        const [deletedProduct] = await db.delete(productsTable).where(eq(productsTable.id, id)).returning();
        if (deletedProduct) {
            res.status(204).send({ message: 'Product deleted successfully' });

        }
        else
            res.status(404).send({ message: 'Product not found' });

 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in deleting product');
        
    }


}

