import express from 'express';
import productRoutes from './routes/products/index';  // Import product routes


const app = express()
const port = 3000

// Middleware to parse JSON bodies
app.use(express.json());

// Use product routes
app.use('/api/v1/products', productRoutes);



app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})