import { User } from "../models/user.js"
import ErrorHandler from "../utils/errorHandler.js"
import jwt from 'jsonwebtoken'

export const isAuthenticated = async (req, res, next) => {
    const token = req.cookies["token"]
    if(!token){
        return res.status(401).json({
            msg: "Please Login to access resource"
        })
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decodedData._id)
    next()
}