import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { handleError } from '../utils/error.js'

//Register
export const register = async (req, res, next) => {
  {
    const username = await User.findOne({ username: req.body.username })
    username && next(handleError(409, 'Username already exists!'))

    const email = await User.findOne({ email: req.body.email })
    email && next(handleError(409, 'Email already exists!'))

    try {
      const newUser = new User(req.body)
      await newUser.save()
      res.status(200).send('User has been created.')
    } catch (error) {
      next(handleError(500, 'Internal Server Error!'))
    }
  }
}

//Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    !user && next(handleError(404, 'Email not found!'))

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return next(handleError(400, 'Password is wrong!'))

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
    )

    const { password, isAdmin, ...other } = user._doc

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .send({ data: other, message: 'Login Success' })
  } catch (error) {
    next(handleError(500, 'Internal Server Error!'))
  }
}
