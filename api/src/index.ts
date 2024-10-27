import express, {json, urlencoded} from 'express';
import productRoutes from './routes/products/index';  // Import product routes
import authRoutes from './routes/auth/index'; // Import auth routes


const app = express()
const port = 3000

// Middleware to parse JSON bodies
app.use(urlencoded({ extended: false }));
app.use(express.json());

// Use product routes
app.use('/api/v1/products', productRoutes);

// Use auth routes
app.use('/api/v1/auth', authRoutes);



app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})