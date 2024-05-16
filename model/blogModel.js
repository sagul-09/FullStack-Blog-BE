import mongoose from 'mongoose'
// import multer from 'multer';

const authorSchema = mongoose.Schema({
    author:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    }
    });

const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: authorSchema,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
},
{timestamps: true},
);

const blogModel = mongoose.model("Blog", blogSchema);

export default blogModel;