import mongoose from 'mongoose';
// import validator from 'validator';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        min: 4
    },
    password:{
        type: String,
        required: true,
        min: 8
    },
},
    {timestamps: true},
);

Schema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const userModel = mongoose.model('User', Schema);

export default userModel;