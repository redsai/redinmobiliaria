import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = Schema({
    nombres: { type: String, required: true },
    apellidos: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    celular: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    sexo: { type: String, required: true  },
    foto: { type: String, required: true },
    cedula: {type: String, required: true},
    Ciudad: {type: String, required: true},
    PerfilFacebook: {type: String, required: true},
    NombreEmpresa: {type: String},
    NitEmpresa: {type: String},
    inmobiliarioIndep: {type: String},
    aniosInmobiliario: {type: String},
    tarjetaPresntacion: {type: String},
    brochureEmpresarial: {type: String},
    Admitido: {type: Boolean}
})

UserSchema.plugin(uniqueValidator)

export default mongoose.model('User', UserSchema)