import Debug from 'debug'
import { secret } from '../config'
import jwt from 'jsonwebtoken'
import { user } from "../db-api"

const debug = new Debug('Inmobiliaria:auth-middleware')

export const required = (req, res, next) => {  
  jwt.verify(req.query.token, secret, (err, token) => {
    if (err) {
      debug('JWTF was not enctrypted with our secret')
      return res.status(401).json({
        message: 'Unauthorized',
        error: err
      })
    }

    debug(`Token verified ${token}`)    
    req.user = token.User
    next()
  })
}

export const UserNewMiddleware = async (req, res, next) =>{
  try {
      req.users = await user.findByAdmitido()
      next()
  } catch (error) {
      hanleError(error, res)
  }
  
}
/*export const propertyUserMiddleware = (req, res, next) => {
  const { id } = req.params
  var gender = '_id';
  req.property = _.filter(propertys.user, function(user){
    return _.has(user, gender) && user[gender] === id;
  });
  //req.property =_.where(propertys.user, { _id : id});
  //req.property = propertys.filter(({ _id }) => user._id === +id)
  next()
}*/