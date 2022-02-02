import mongoose, { Schema } from 'mongoose'
import { object } from 'underscore'

const { ObjectId } = Schema.Types

const ShoppingSchema = Schema({
    NombreInmueble: { type: String, required: true },
    DescripcionInmueble: { type: String, required: true },    
    createdAt: { type: Date, default: Date.now, required: true },
    Departamento: { type: String, required: true },
    Ciudad: { type: String, required: true },
    Barrio: { type: String, required: true },
    user: { type: ObjectId, ref: 'User', required: true },
    comment: [{ type: ObjectId, ref: 'Comments', desault: [] }]
})

export default mongoose.model('Shopping', ShoppingSchema)
