import mongoose, { Schema } from 'mongoose'
import { object } from 'underscore'

const { ObjectId } = Schema.Types

const PropertySchema = Schema({
    NombreInmueble: { type: String, required: true },
    DescripcionInmueble: { type: String, required: true },
    Precio: { type: String, required: true },
    TipoOferta: { type: String, required: true },
    TipoInmueble: { type: String, required: true },
    Banios: { type: String },
    Habitaciones: { type: String },
    Garaje: { type: String },
    Asensor: { type: String },
    createdAt: { type: Date, default: Date.now, required: true },
    Departamento: { type: String, required: true },
    Ciudad: { type: String, required: true },
    Barrio: { type: String, required: true },
    Imagenes: { type: object },    
    user: { type: ObjectId, ref: 'User', required: true },
    comment: [{ type: ObjectId, ref: 'Comments', desault: [] }]
})

export default mongoose.model('Property', PropertySchema)
