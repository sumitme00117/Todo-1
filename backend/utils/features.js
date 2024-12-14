import mongoose from "mongoose"
import jwt from 'jsonwebtoken'

export const connectDB = async () => {
   const {connection} = await mongoose.connect(process.env.MONGO_URI)

   console.log(`Database connected at ${connection.host}`)
}

export const generateToken = async (id) => {
    const tokens = await jwt.sign({_id: id}, process.env.JWT_SECRET)
    return tokens
}
