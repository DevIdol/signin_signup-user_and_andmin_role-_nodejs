import dotenv from 'dotenv'
import express from 'express'
import { connect, disconnection } from './db.js'
import authRoute from './routes/auth.js'
const app = express()
dotenv.config()

//mongodb
disconnection;



//routes
app.use('/api/v1/auth', authRoute)


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT}`);
})
