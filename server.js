import dotenv from 'dotenv'
import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'
import { connect, disconnection } from './db.js'
import authRoute from './routes/auth.js'
import userRouter from './routes/user.js'
import cookieParser from 'cookie-parser'
const app = express()
dotenv.config()

app.use(cookieParser())
app.use(bodyparser.json())
app.use(cors())

//mongodb
disconnection

//routes
app.use('/api/v1/auth', authRoute)
app.use('api/v1/users', userRouter )

//middleware
app.use((error, req, res, next) => {
  const errorStatus = error.status || 500
  const errorMessage = error.message || 'Something went wrong!'
  return res.status(error.status).send({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  connect()
  console.log(`Server running on port ${PORT}`)
})
