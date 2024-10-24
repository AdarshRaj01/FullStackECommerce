import { Router } from "express";

const router =  Router();

//Define routes

//get all products
router.get('/',(req,res)=>{
    res.send('Get all products');
})

//get a product by id
router.get('/:id',(req,res)=>{
    res.send(`Get product by id: ${req.params.id}`);
})

//post a new product

router.post('/',(req,res)=>{
    res.send('Create a new product');
})



export default router
