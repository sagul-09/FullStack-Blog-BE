import express from 'express';
import {getAllBlogs, getBlogByID, createBlog} from '../controller/blogController.js';

const blogRouter = express.Router();

blogRouter.get('/',getAllBlogs);
blogRouter.get('/:id',getBlogByID);
blogRouter.post('/create',createBlog);

export default blogRouter;