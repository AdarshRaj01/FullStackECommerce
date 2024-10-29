import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware.js";
import { createUserSchema, loginSchema, usersTable } from "../../db/userSchema.js";
import bcrypt from 'bcryptjs';
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken';


const router =  Router();


// Secret key for JWT (Store this in environment variables for security)
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup user
router.post('/signup', validateData(createUserSchema), async (req, res):Promise<void> => {
    try {
        const data = req.cleanBody;

        // Check if the email already exists
        const [existingUser] = await db.select().from(usersTable).where(eq(usersTable.email, data.email));
        if (existingUser) {
             res.status(400).json({ message: "Email is already registered" });
             return
        }

        // Hash the password before storing
        data.password = await bcrypt.hash(data.password, 10);

        // Insert the new user and return only necessary fields
        const [user] = await db.insert(usersTable).values(data).returning({
            id: usersTable.id,
            email: usersTable.email,
            name: usersTable.name,
            role: usersTable.role,
            address: usersTable.address,
        });

        console.log(user.role)


        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, role:user.role }, JWT_SECRET, {
            expiresIn: '5d', // Token expiration time
        });

        res.status(201).json({ user, token });
    
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong");
    }
});

//Login user
router.post('/login', validateData(loginSchema), async(req, res) => {
    try {
        const {email,password} = req.cleanBody;

        const [user] =await db.select().from(usersTable).where(eq(usersTable.email, email))
            

        if(!user){
            res.status(401).json({message:"Authentication failed"})
            return
        }

        
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "Authentication failed" });
            return;
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, role:user.role }, JWT_SECRET, {
            expiresIn: '5d', // Token expiration time
        });

        // Create a sanitized user object without the password
        const sanitizedUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        res.status(201).json({ user:sanitizedUser, token });


        

    } catch (error) {
        res.status(500).send("Something went wrong")
        
    }
})




export default router
