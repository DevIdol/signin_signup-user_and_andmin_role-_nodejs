import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: '',
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
)

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(Number(process.env.SALT))
  this.password = await bcrypt.hash(this.password, salt)
})

export default mongoose.model('user', UserSchema)
