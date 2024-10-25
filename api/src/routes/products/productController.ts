import { Request, Response } from "express";
import { db } from "../../db/index";
import { productsTable } from "../../db/productSchema";
import { eq } from "drizzle-orm";

export async function listProducts(req:Request, res:Response){
    try {
        const allProducts = await db.select().from(productsTable);
        res.status(201).json(allProducts)
    } catch (error) {
        res.status(500).send('Error in retrieving products')
    }
}



export async function getProductbyId(req:Request, res:Response){
    try {
        const id = (req.params.id);
        const product = await db.select().from(productsTable).where(eq(productsTable.id, Number(id)));

        if (product.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
          }
          res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message:"Error in retrieving product"})
    }

}


export async function createProduct(req:Request, res:Response){
    try {
        const body = req.body;
        const [newProduct] = await db.insert(productsTable).values(body).returning()
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in creating product');
        
    }


}

export async function updateProduct(req:Request, res:Response){
    try {
        const id = Number(req.params.id);
        const updatedData = req.body;
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
        const [deleteProduct] = await db.delete(productsTable).where(eq(productsTable.id, id)).returning();
        if (deleteProduct) {
            res.status(204).send({ message: 'Product deleted successfully' });

        }
        else
            res.status(404).send({ message: 'Product not found' });

 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in deleting product');
        
    }


}

