import express from 'express';
import {getAllBlogs, getBlogByID, createBlog, updateBlog, deleteBlog} from '../controller/blogController.js';

const blogRouter = express.Router();

blogRouter.get('/',getAllBlogs);
blogRouter.get('/:id',getBlogByID);
blogRouter.post('/create',createBlog);
blogRouter.put('/update/:id',updateBlog);
blogRouter.delete('/delete/:id',deleteBlog);

export default blogRouter;