import { property, shopping } from "../db-api"
import { hanleError } from '../utils'

export const commentMiddleware = async (req, res, next) =>{
    try {
        req.property = await property.findById(req.params.id)
        next()
    } catch (error) {
        hanleError(error, res)
    }
    
}
export const commentBarrioMiddleware = async (req, res, next) =>{
    try {
        
        req.propertyBarrio = await property.findBarrio(req.params.Barrio)
        next()
    } catch (error) {
        hanleError(error, res)
    }
    
}
export const commentUserMiddleware = async (req, res, next) =>{
    try {        
        req.propertyUser = await property.findUser(req.params.id)
        next()
    } catch (error) {
        hanleError(error, res)
    }
    
}
export const commentShoppingMiddleware = async (req, res, next) =>{
    try {
        req.shopping = await shopping.findById(req.params.id)
        next()
    } catch (error) {
        hanleError(error, res)
    }    
}
export const commentShoppingBarrioMiddleware = async (req, res, next) =>{
    try {
        /*if(req.params.Barrio.){

        }*/
        req.shoppingBarrio = await shopping.findBarrio(req.params.Barrio)
        next()
    } catch (error) {
        hanleError(error, res)
    }
    
}