import mongoose from 'mongoose'

const TokenSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  token: { type: String, required: true },
})
export default mongoose.model('token', TokenSchema)
