import Debug from 'debug'
import { Shopping, Comments } from '../models'

const debug = new Debug('inmobiliaria:db-api/shopping')

export default {
    findAll: async () => {
        debug('Finding all shopping')
        return Shopping.find()
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
        debug('Finding all shopping')
        return Shopping
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
    findBarrio: (Barrio) => {
        debug('Finding all shopping')        
        return Shopping
        .find({ Barrio })
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
        debug(`Creado nueva shopping ${q}`)        
        const shopping = new Shopping(q)
        return shopping.save()
    },
    createComment : async (q, a) =>{
        const comment = new Comments(a)       
        const savedComment = await comment.save()
        q.comment.push(savedComment)
        await q.save()
        return savedComment
    }
}