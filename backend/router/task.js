import express from 'express'
import { deleteTask, getAllTasks, newTask, updateTask } from '../controllers/task.js'
import { isAuthenticated } from '../middlewares/auth.js'


const router = express.Router()

router.post("/new", isAuthenticated, newTask)
router.put("/update/:id", isAuthenticated, updateTask)
router.delete("/delete/:id", isAuthenticated, deleteTask)
router.get("/all", isAuthenticated, getAllTasks)





export default router
