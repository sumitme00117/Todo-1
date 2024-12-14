import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: "User",
        required: true
    }
})

export const Task = mongoose.model("Task", taskSchema)