import Debug from 'debug'
import { User } from '../models'
const debug = new Debug('inmobiliaria:db-api/user')

export default {
    findById: async (_id) => {
        debug('Finding all user')
        return User
        .findOne({ _id })
    },
    findByAdmitido: async () => {        
        debug('Finding all user')
        return User.find({ Admitido: false })              
    }   
}