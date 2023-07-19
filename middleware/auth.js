import jwt from "jsonwebtoken"
import User from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({
            message: "Please login First"
        })

        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

