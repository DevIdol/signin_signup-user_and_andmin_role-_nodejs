import User from '../models/User.js'

//Update
export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    )
    res
      .status(200)
      .send({ data: updateUser, message: 'User has been updated.' })
  } catch (error) {
    next(handleError(500, 'Internal Server Error!'))
  }
}

//Delete
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send({ message: 'User has been deleted.' })
  } catch (error) {
    next(handleError(500, 'Internal Server Error!'))
  }
}

//Get User
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).send({ data: user })
  } catch (error) {
    next(handleError(500, 'Internal Server Error!'))
  }
}

//Get Users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200).send({ data: users })
  } catch (error) {
    next(handleError(500, 'Internal Server Error!'))
  }
}
