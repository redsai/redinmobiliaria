import express from 'express'
import { 
  required,
  commentMiddleware,
  commentBarrioMiddleware,
  commentUserMiddleware
 } from '../middleware'
import { property } from '../db-api'
import { handleError } from '../utils'
import { User, Property } from '../models';
import upload from '../libs/multer';
import path from 'path';
import { cloudinary } from '../app';
const fs = require('fs-extra');
const app = express.Router()

// GET /api/property
app.get('/', async (req, res) => {
  try {
    const p = await property.findAll()
    res.status(200).json(p)
  } catch (error) {
    handleError(error, res)
  }
})

// GET /api/property/:id
app.get('/:id', commentMiddleware, async (req, res) => {  
  try {    
    res.status(200).json(req.property)  
  } catch (error) {
    handleError(error, res)
  }  
})
// GET /api/property/:id
app.delete('/:id', async (req, res) => {       
    try {      
      const { id }  = req.params
      var myquery = { _id: id };
      const result = await Property.deleteOne( myquery )
      res.status(201).json( { msg: 'Propiedad eliminada' })
    } catch (error) {
      handleError(error, res)
    }
})
// GET /api/property/Barrio/:Barrio
app.get('/barrio/:Barrio', commentBarrioMiddleware, async (req, res) => {  
  try {    
    res.status(200).json(req.propertyBarrio)  
  } catch (error) {
    handleError(error, res)
  }  
})

// GET /api/property/User/:User
app.get('/User/:id', commentUserMiddleware, async (req, res) => {  
  try {    
    res.status(200).json(req.propertyUser)  
  } catch (error) {
    handleError(error, res)
  }  
})

// POST /api/property
//app.post('/',  upload.single('image'), required, async (req, res) => {
app.post('/',  upload.array('image',8), required, async (req, res) => {
  var Imagess = [];
  for (let index = 0; index < req.files.length; index++) {    
    const element = req.files[index];      
    const result = await cloudinary.v2.uploader.upload(element.path);
    Imagess.push(result.url);    
    await fs.unlink(req.files[index].path);
  }
  const { 
    NombreInmueble,
    DescripcionInmueble,
    Precio,
    TipoOferta,
    TipoInmueble, 
    Banios, 
    Habitaciones, 
    Garaje, 
    Asensor, 
    Departamento, 
    Ciudad, 
    Barrio,
    } = req.body    
    const q = {
      NombreInmueble,
      DescripcionInmueble, 
      Precio,
      TipoOferta,
      TipoInmueble,
      Banios, 
      Habitaciones, 
      Garaje, 
      Asensor, 
      Departamento, 
      Ciudad, 
      Barrio,
      Imagenes: Imagess,
      user: req.user._id
    }
    try {      
      const savedProperty = await property.create(q)
      res.status(201).json(savedProperty)
    } catch (error) {      
      handleError(error, res)
    }    
})

// POST /api/property/:id
app.put('/:id', required, async (req, res) => {
  const { 
    NombreInmueble,
    DescripcionInmueble, 
    Precio,
    Banios, 
    Habitaciones, 
    Garaje, 
    Asensor, 
    Departamento, 
    Ciudad, 
    Barrio,
    } = req.body    
    const q = {
      NombreInmueble,
      DescripcionInmueble, 
      Precio,
      Banios, 
      Habitaciones, 
      Garaje, 
      Asensor, 
      Departamento, 
      Ciudad, 
      Barrio,
      user: req.user._id
    }
    try {            
      const { id }  = req.params
      var myquery = { _id: id };
      const result = await Property.updateOne( myquery, q )
      res.status(201).json( { msg: 'Propiedad Actualizada' })
    } catch (error) {
      handleError(error, res)
    }        
})

app.post('/:id/comment', required, commentMiddleware, async (req, res) => {
  const c = req.body
  const q = req.property
  c.createdAt = new Date()
  c.user = new User(req.user)
  try {      
    const savedComment = await property.createComment(q, c)
    res.status(201).json(savedComment)
  } catch (error) {
    handleError(error, res)
  }
})

export default app
