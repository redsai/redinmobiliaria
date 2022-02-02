import express from 'express'
import { required, commentShoppingMiddleware, commentShoppingBarrioMiddleware } from '../middleware'
import { shopping } from '../db-api'
import { handleError } from '../utils'
import { User } from '../models'
const app = express.Router()

// GET /api/shopping
app.get('/', async (req, res) => {
  try {
    const p = await shopping.findAll()
    res.status(200).json(p)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/shopping/:id
app.get('/:id', commentShoppingMiddleware, async (req, res) => {  
  try {    
    res.status(200).json(req.shopping)  
  } catch (error) {
    handleError(error, res)
  }  
})
// GET /api/shopping/:id
app.get('/user/:id', (req, res) => {
  res.status(200).json(req.shopping)
})
// GET /api//Barrio/:Barrio
app.get('/barrio/:Barrio', commentShoppingBarrioMiddleware, async (req, res) => {  
  try {    
    res.status(200).json(req.shoppingBarrio)  
  } catch (error) {
    handleError(error, res)
  }  
})

// POST /api/shopping
app.post('/', required, async (req, res) => {
  const { 
    NombreInmueble,
    DescripcionInmueble,     
    Departamento, 
    Ciudad, 
    Barrio } = req.body
    const q = {
      NombreInmueble,
      DescripcionInmueble,       
      Departamento, 
      Ciudad, 
      Barrio,
      user: req.user._id
    }
    try {      
      const savedShoppin = await shopping.create(q)
      res.status(201).json(savedShoppin)
    } catch (error) {
      handleError(error, res)
    }
    
})

app.post('/:id/comment', required, commentShoppingMiddleware, async (req, res) => {
  const c = req.body
  const q = req.shopping
  c.createdAt = new Date()
  c.user = new User(req.user)
  try {      
    const savedComment = await shopping.createComment(q, c)
    res.status(201).json(savedComment)
  } catch (error) {
    handleError(error, res)
  }
})

export default app