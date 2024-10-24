import { Request, Response } from "express";

export function listProducts(req:Request, res:Response){
    res.send('Get all products');

}



export function getProductbyId(req:Request, res:Response){
    res.send(`Get product by id: ${req.params.id}`);

}


export function createProduct(req:Request, res:Response){
    res.send('New product created');

}

export function updateProduct(req:Request, res:Response){
    res.send('Update product');

}

export function deleteProduct(req:Request, res:Response){
    res.send('Delete product');

}

