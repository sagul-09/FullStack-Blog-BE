import jwt from 'jsonwebtoken'
import { jwtVerify } from "../utils/jwtVerify.js";

const JWT_SECRET = process.env.JWT_SECRET || "asdfghjkl";

const authMiddleware = (req, res, next) => {
    try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized token" });
    }
    const verified = jwtVerify(token);
    if (!verified) {
      return res.status(401).json({ message: "Unauthorized verified" });
    }
    req.user = verified;
    next();
  } catch (error) {
    next(error);
  }
};
export default authMiddleware;