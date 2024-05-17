import blogModel from '../model/blogModel.js'

const getAllBlogs = async (req,res)=>{
    //to get all blogs
    try{
        const getBlogs = await blogModel.find();
        return res.status(200).json({message: "All blogs have been retrived successfully",getBlogs});
    }catch(err){   
        return res.status(500).json({message: err.message});
    }
}

const getBlogByID = async (req,res)=>{
    try{
        //search a blog using its ID
        const getBlog = await blogModel.findById(req.params.id);
        return res.status(200).json({message: "Blog has been retrived successfully",getBlog});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

const createBlog = async (req,res)=>{
    //creating a new blog
    if(!req.body.title || !req.body.author ||!req.body.content){
        return res.status(400).json({message: "Please fill all fields"});
    }
    try{
        const newBlog = await blogModel.create(req.body);
        return res.status(201).json({message: "Blog has been created successfully",newBlog});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

const updateBlog = async (req, res) => {
    try {
        //update blog
        const blogUpdate = await blogModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!blogUpdate) {
            return res.status(404).json({ message: "Blog not found" });
        }
        return res.status(200).json({ message: "Blog has been edited successfully", blog: blogUpdate });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const deleteBlog = async (req,res)=>{
    try{
        //delete blog
        const blogDelete = await blogModel.findByIdAndDelete(req.params.id);
        if(!blogDelete){
            return res.status(404).json({message: "Blog not found"});
        }
        return res.status(200).json({message: "Blog has been deleted sucessfully"})
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

export {getAllBlogs, getBlogByID, createBlog, updateBlog, deleteBlog}