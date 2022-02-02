import mongoose, { Schema } from 'mongoose'
const { ObjectId } = Schema.Types
const CommentsSchema = Schema({
    descripcion: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    user: { type: ObjectId, ref: 'User', required: true }
})

export default mongoose.model('Comments', CommentsSchema)