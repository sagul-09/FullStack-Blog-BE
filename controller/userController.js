import express from "express";
import userSchema from "../model/userModel.js";
import bcrypt from "bcrypt";

const getAllUsers = async (req,res)=>{
    try{
        const getUsers = await userSchema.find();
        return res.status(200).json({message: "All users have been retrived successfully",getUsers});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

const registerUser = async (req, res) => {
    try {
        // Check if all required fields are provided
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // Check if the user already exists
        const userExists = await userSchema.findOne({ username: req.body.username });
        if (userExists) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = await userSchema.create(req.body);
        return res.status(201).json({ message: "User has been created successfully", newUser });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const loginUser = async(req,res)=>{
    try{
        if(!req.body.username || !req.body.password){
            return res.status(400).json({message: "Please fill all fields"})
        }
        const userExists = await userSchema.findOne({username: req.body.username});
        if(!userExists){
            return res.status(409).json({message: "user does'nt exist"});
        }
        const passwordMatch = await bcrypt.compare(req.body.password, userExists.password);
        if(!passwordMatch){
            return res.status(401).json({message: "Invalid credentials"});
        }
        return res.status(201).json({message: "User has been logged in successfully",username: req.body.username})
        
    }catch(err){
        return res.status(500).json({message: "Login failed",err: err.message})
    }
}
export {getAllUsers, registerUser, loginUser};