import express from 'express';
import {getAllBlogs, getBlogByID, createBlog, updateBlog, deleteBlog} from '../controller/blogController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { verifyUser } from '../middleware/Verify-user.js';
// import authMiddleware from '../middleware/authMiddleware.js';

const blogRouter = express.Router();

//public routes
blogRouter.get('/',getAllBlogs);
blogRouter.get('/:id',getBlogByID);
blogRouter.post('/create',createBlog);

//private routes
blogRouter.put('/update/:id',authMiddleware,verifyUser('admin'),updateBlog);
blogRouter.delete('/delete/:id',authMiddleware,verifyUser('admin'),deleteBlog);

export default blogRouter;