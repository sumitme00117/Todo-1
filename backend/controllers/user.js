import { User } from "../models/user.js"
import { generateToken } from "../utils/features.js"
import cloudinary from 'cloudinary'

export const signup = async (req,res) => {
    try{
        const {name, email, password, avatar} = req.body

        if(!email || !password || !name) return res.status(500).json({
            success: false,
            msg: "Please enter all fields"
        })
        
        let user = await User.findOne({email})
        if(user)
        {

            return res.status(400).json({success: false, message: "User already exists"})
        }

        const myCloud = await cloudinary.v2.uploader.upload(avatar,{folder: "todo_avatar"})

        user = await User.create({
            name,
            email,
            password,
            avatar: {public_id: myCloud.public_id, url: myCloud.secure_url}
        })

    return res.status(201).json({
        success: true,
        user,
        msg: "User signed up successfully. Please Login"
    })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) return res.status(500).json({
            success: false,
            msg: "Please enter all fields"
        })
    
        const user = await User.findOne({email})
    
    
        if(!user) return res.status(404).json({
            success: false,
            msg: "Invalid credentials"
        })
    
        if(user.password != password) return res.status(404).json({
            success: false,
            msg: "Invalid credentials"
        })
    
        const token = await generateToken(String(user._id))
        const options = {
            expires: new Date(Date.now()+60*60*1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None',
        }
    
        return res.status(200).cookie("token",token,options).json({
            success: true,
            user,
            token,
            msg: "Login Success"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }

}


export const logout = (req,res) => {
    try {
        return res.status(200).cookie("token",null,{expires: new Date(Date.now()), httpOnly: true}).json({
            success: true,
            msg: "Logout Success"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
    return res.status(200).json({
        success: true,
        user: req.user
    })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}


export const myProfileUpdate = async (req,res) => {
    try{
        const {name, email, password, avatar} = req.body
        
        let user = await User.findOne({_id: req.user._id})
        
        await cloudinary.v2.uploader.destroy(user.avatar.public_id)
        const myCloud = await cloudinary.v2.uploader.upload(avatar,{folder: "todo_avatar"})

        // user = await User.create({
        //     name,
        //     email,
        //     password,
        //     avatar: {public_id: myCloud.public_id, url: myCloud.secure_url}
        // })
        user.name = name,
        user.email = email,
        user.password = password,
        user.avatar = {public_id: myCloud.public_id, url: myCloud.secure_url}

        await user.save()

    return res.status(201).json({
        success: true,
        user,
        msg: "Profile updated successfully. Please login"
    })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}
