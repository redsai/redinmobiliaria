import Debug from 'debug'
import { Property, Comments } from '../models'

const debug = new Debug('inmobiliaria:db-api/property')

export default {
    findAll: async () => {
        debug('Finding all property')
        return Property.find()
        .populate({
            path: 'user',
            select: '-password'
        })
        .populate({
            path: 'comment',
            options: { sort: '-createdAt' },
            populate: {
                path: 'user',
                model: 'User',
                select: '-password'
            }
        })
    },
    findBarrio: (Barrio) => {
        debug('Finding all property')
        return Property.find({ Barrio })
        .populate({
            path: 'user',
            select: '-password'
        })
        .populate({
            path: 'comment',
            options: { sort: '-createdAt' },
            populate: {
                path: 'user',
                model: 'User',
                select: '-password'
            }
        })
    },
    findUser: (_id) => {
        debug('Finding all property')
        
        return Property.find({ user:{_id} })
        .populate({
            path: 'user',
            select: '-password'
        })
        .populate({
            path: 'comment',
            options: { sort: '-createdAt' },
            populate: {
                path: 'user',
                model: 'User',
                select: '-password'
            }
        })
    },
    findById: (_id) => {
        debug('Finding all property')
        return Property
        .findOne({ _id })
        .populate({
            path: 'user',
            select: '-password'
        })
        .populate({
            path: 'comment',
            options: { sort: '-createdAt' },
            populate: {
                path: 'user',
                model: 'User',
                select: '-password'
            }
        })
    },
    create: (q) => {
        debug(`Creado nueva propiedad ${q}`)        
        const property = new Property(q)
        return property.save()
    },
    createComment : async (q, a) =>{
        const comment = new Comments(a)     
        const savedComment = await comment.save()
        q.comment.push(savedComment)        
        await q.save()
        return savedComment
    }
}