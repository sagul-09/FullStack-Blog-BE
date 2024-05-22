import express from 'express';
import {getAllBlogs, getBlogByID, createBlog, updateBlog, deleteBlog} from '../controller/blogController.js';
// import authMiddleware from '../middleware/authMiddleware.js';

const blogRouter = express.Router();

//public routes
blogRouter.get('/',getAllBlogs);
blogRouter.get('/:id',getBlogByID);

//private routes
blogRouter.post('/create',createBlog);
blogRouter.put('/update/:id',updateBlog);
blogRouter.delete('/delete/:id',deleteBlog);

export default blogRouter;