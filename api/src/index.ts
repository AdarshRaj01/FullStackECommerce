import serverless from "serverless-http";

import express, {json, urlencoded} from 'express';
import productRoutes from './routes/products/index.js';  // Import product routes
import authRoutes from './routes/auth/index.js'; // Import auth routes
import orderRoutes from './routes/orders/index.js'; // Import auth routes



const app = express()
const port = 3000

// Middleware to parse JSON bodies
app.use(urlencoded({ extended: false }));
app.use(express.json());

// Use product routes
app.use('/api/v1/products', productRoutes);

// Use auth routes
app.use('/api/v1/auth', authRoutes);

//Use order routes
app.use('/api/v1/orders', orderRoutes)



app.get('/', (req, res) => {
  res.send('Hello world')
})

if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(
      `Server is running on port ${port}. Check the app on http://localhost:${port}`
    );
  });
}

export const handler = serverless(app);