import express from 'express'
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from '../controllers/user.js'
import { verifyAdmin, verifyUser } from '../utils/verifiedToken.js'
const router = express.Router()

//Update
router.put('/:id', verifyUser, updateUser)

//Delete
router.delete('/:id', verifyUser, deleteUser)

//Get User
router.get('/:id', getUser)

//Get Users
router.get('/', verifyAdmin, getUsers)

export default router
