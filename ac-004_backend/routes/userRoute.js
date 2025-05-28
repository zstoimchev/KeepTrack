import express from 'express'
import { getAllUsers, registerUser, loginUser, updateUser } from '../controllers/userController.js';
const router = express.Router()

router.get('/all', getAllUsers)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/:id', updateUser)

export default router