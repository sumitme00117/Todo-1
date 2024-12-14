import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './utils/features.js'
import userRoute from './router/user.js'
import taskRoute from './router/task.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import cloudinary from 'cloudinary'



const app = express()

dotenv.config({
    path: './config/config.env'
})

connectDB()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    credentials: true // Allow cookies to be sent
}))
app.use("/api/v1/user", userRoute)
app.use("/api/v1/task", taskRoute)
app.get("/", (req,res) =>{
    res.send("Hello World!")
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})