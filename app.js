import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './router/userRouter.js';
import blogRouter from './router/blogRouter.js';


const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = 2400;

const db = mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('Database connected');
}).catch((err) => {
    console.log('Error:' ,err);
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/blogs', blogRouter);

app.listen(PORT,() => { 
    console.log(`Server is running on port http://localhost:${PORT}`);
});
