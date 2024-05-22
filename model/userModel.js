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
    const salt = await bcrypt.genSalt(10); 
    this.password = bcrypt.hashSync(this.password, salt);
    next();
    //Prevent Duplicate Hashes: Without a salt, two users with the same password 
    //would have the same hash. This means that if one user's password is compromised, 
    //then all other users with the same password are also compromised. Salting prevents 
    //this by ensuring that each user's hash is unique.
});

const userModel = mongoose.model('User', Schema);

export default userModel;