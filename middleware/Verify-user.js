import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const verifyUser = (role) => {
    return async (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) return res.status(401).json({ message: "No Token Provided" });

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            const checkUser = await userModel.findOne({ _id: req.user.payload.id });
            if (!checkUser) return res.status(401).json({ message: "Unauthorized User" });
            console.log(checkUser.role, req.user.payload.role)
            if (checkUser.role !== req.user.payload.role)
                return res.status(401).json({ message: "Unauthorized Role" });
            if (role.includes(req.user.payload.role)) {
                next();
            } else {
                return res.status(401).json({ message: "Unauthorized Role" });
            }
        } catch (error) {
            return res.status(401).json({ message: "Invalid Token", error: error.message });
        }
    };
};

export { verifyUser };