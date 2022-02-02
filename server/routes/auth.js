import express, { query } from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret } from '../config'
import { User } from '../models'
import { user } from '../db-api'
import upload from '../libs/multer';
import { cloudinary } from '../app';
const fs = require('fs-extra');
var nodemailer = require("nodemailer");
import { 
  required,
  UserNewMiddleware
 } from '../middleware'
import path from 'path';
import { 
  hashSync as hash,
  compareSync as comparePasswords
} from 'bcryptjs'
import { handleError } from '../utils'

const app = express.Router()
const debug = new Debug('Inmobiliaria:auth')

app.post('/signinAdmin', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    debug(`User with email ${email} not found`)
    return handleLoginFailed(res)
  }

  if (!comparePasswords(password, user.password)) {
    debug(`Passwords do not match: ${password} !== ${user.password}`)
    return handleLoginFailed(res, 'El correo y la contraseña no coinciden')
  }

  const token = createToken(user)
  res.status(200).json({
    message: 'Login succeded',
    token,
    userId: user._id,
    nombres: user.nombres,
    apellidos: user.apellidos,
    celular: user.celular,
    fechaNacimiento: user.fechaNacimiento,
    sexo: user.sexo,
    email: user.email
  })
})


app.post('/signin', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    debug(`User with email ${email} not found`)
    res.status(401).json({
      error: ' Usuario no existe'
    })
    //return handleLoginFailed(res)
  }else if (!user.Admitido) {
    debug(`Usuario no verificado`)
    res.status(401).json({
      error: ' Falta verificación'
    })
    //return handleLoginFailed(res,'Falta verificación')
  }else if (!comparePasswords(password, user.password)) {
    debug(`Passwords do not match: ${password} !== ${user.password}`)
    res.status(401).json({
      error: ' El correo y la contraseña no coinciden'
    })
    //return handleLoginFailed(res, 'El correo y la contraseña no coinciden')
  }else{

    const token = createToken(user)
    res.status(200).json({
      message: 'Login succeded',
      token,
      userId: user._id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      celular: user.celular,
      fechaNacimiento: user.fechaNacimiento,
      sexo: user.sexo,
      email: user.email,
      foto: user.foto,
      cedula: user.cedula,
      Ciudad: user.Ciudad,
      PerfilFacebook: user.PerfilFacebook,
      NombreEmpresa: user.NombreEmpresa,
      NitEmpresa: user.NitEmpresa,
      inmobiliarioIndep: user.inmobiliarioIndep,
      aniosInmobiliario: user.aniosInmobiliario,
      tarjetaPresntacion: user.tarjetaPresntacion,
      brochureEmpresarial: user.brochureEmpresarial,
      Admitido: user.Admitido
    })
  }
})

const createToken = (User) => jwt.sign({ User }, secret, { expiresIn: 86400 })

app.post('/signup', upload.fields([
  { name: 'foto'},
  { name: 'cedula'},
  { name: 'tarjetaPresntacion'},
  { name: 'brochureEmpresarial'}]), async (req, res) => {

    

  const { nombres, apellidos, celular, fechaNacimiento, sexo, email, password, Ciudad, PerfilFacebook, NombreEmpresa, NitEmpresa,
    inmobiliarioIndep, aniosInmobiliario } = req.body
    const user = await User.findOne({ email })

    if (user) {
      debug(`User with email ${email} not found`)
      res.status(401).json({
        error: ' Usuario ya existe en el sistema'
      })
      //return handleLoginFailed(res)
    
    }else{
    var fotos = '';
    const elementfoto = req.files.foto[0];  
    const result1 = await cloudinary.v2.uploader.upload(elementfoto.path);
    fotos = result1.url; 
    await fs.unlink(req.files.foto[0].path);
    var cedulas = '';
    const elementcedul = req.files.cedula[0];  
    var result2 = await cloudinary.v2.uploader.upload(elementcedul.path);
    cedulas = result2.url;
    await fs.unlink(req.files.cedula[0].path);
    
    try {
      var tarjetaPresntacions = '';
      const elementtarje = req.files.tarjetaPresntacion[0].path;  
      const result3 = await cloudinary.v2.uploader.upload(elementtarje);
      tarjetaPresntacions = result3.url; 
      await fs.unlink(req.files.tarjetaPresntacion[0].path);
    } catch (error) {
      
    }
     try {
      var brochureEmpresarials = '';
      const elementbrochu = req.files.brochureEmpresarial[0];  
      const result4 = await cloudinary.v2.uploader.upload(elementbrochu.path);
      brochureEmpresarials = result4.url; 
      await fs.unlink(req.files.brochureEmpresarial[0].path);
      //await fs.unlink(req.files.path);      
     } catch (error) {       
     } 
    
   
  const u = new User({
    nombres,
    apellidos,
    email,
    password: hash(password, 10),
    celular,
    fechaNacimiento,
    sexo,
    foto: fotos,
    cedula: cedulas,
    Ciudad,
    PerfilFacebook,
    NombreEmpresa,
    NitEmpresa,
    inmobiliarioIndep,
    aniosInmobiliario,
    
    tarjetaPresntacion: tarjetaPresntacions,
    brochureEmpresarial: brochureEmpresarials,
    Admitido: false
  })
  const user = await u.save()
  var transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 587,
    auth: {
        user: 'info@redsai.com.co',
        pass: '123123'
    },
    tls: {rejectUnauthorized: false}
  });


  const message = "correo de verificación"
  var contentHtml =` 
    <h1>correo de verificación de datos, una ves verficada la información enviada podra acceder a la plataforma :</h1>
    <ul>
      <li>Usuario: ${nombres}</li>
    <ul>
  `;
  var mailOptions = {
    from: "Remitente",
    to: email,
    subject: message,
    text: contentHtml,
  };
  
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {      
      res.status(500).send(error.message);
    } else {      
     
      res.status(200).json(req.body);
    }
  })
  debug(`Creating new user: ${User}`)
  
  /*const token = createToken(user)
  res.status(201).json({
    message: 'User saved',
    token,
    userId: user._id,
    nombres: user.nombres,
    apellidos: user.apellidos,
    email: user.email,
    celular: user.celular,
    fechaNacimiento: user.fechaNacimiento,
    sexo: user.sexo
  })*/
  }
})

app.put('/putUserPublica/:id', async (req, res) => {
  const { nombres, apellidos, celular,  email } = req.body
    const u = {
      nombres,
      apellidos,
      celular,
      email
    }
  try {      
    const { id }  = req.params
    var myquery = { _id: id };
    const result = await User.updateOne( myquery, u )
    res.status(200).json({
      message: 'Usuario Actualizado',
      token,
      userId: user._id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      celular: user.celular,
      fechaNacimiento: user.fechaNacimiento,
      sexo: user.sexo,
      email: user.email     
    })
  } catch (error) {
    handleError(error, res)
  }     
})
app.put('/putUser/:id', async (req, res) => {
  const { nombres, apellidos, celular,  email } = req.body
    const u = {
      nombres,
      apellidos,
      email,
      celular      
    }
  try {      
    const { id }  = req.params
    var myquery = { _id: id };
    const result = await User.updateOne( myquery, u )
    res.status(201).json( { msg: 'Usuario Actualizado' })
  } catch (error) {
    handleError(error, res)
  }     
})


app.put('/putUserPassword/:id', async (req, res) => {
  const { current_password, new_password } = req.body
  const q = await user.findById(req.params.id)

    if (!comparePasswords(current_password, q.password)) {
      debug(`Passwords do not match: ${q.password} !== ${current_password}`)
      return handleLoginFailed(res, 'La contraseña no coinciden')
    }else{

      const u = {    
        password: hash(new_password, 10)
      }  

      try {              
        var myquery = { _id: req.params.id };
        const result = await User.updateOne( myquery, u )
        res.status(201).json( { msg: 'Usuario Actualizado' })
      } catch (error) {
        handleError(error, res)
      }
    }

 /* try {      
    const { id }  = req.params
    var myquery = { _id: id };
    const result = await User.updateOne( myquery, u )
    res.status(201).json( { msg: 'Usuario Actualizado' })
  } catch (error) {
    handleError(error, res)
  }*/     
})

// GET /api/auth/:id
app.get('/:id', async (req, res) => {
  try {
    const q = await user.findById(req.params.id)
    res.status(200).json(q)  
  } catch (error) {
    handleError(error, res)
  } 
})
// GET /api/auth/admin
app.get('/admin/Admitidos', async (req, res) => {  
  try {     
    const q = await user.findByAdmitido()    
    res.status(200).json(q);
  } catch (error) {    
    handleError(error, res)
  }  
})
// put /api/auth/putUser/Admitido/:id
app.put('/putUser/Admitido/:id', async (req, res) => {  

  const u = {    
    Admitido: true
  }  
    const { id }  = req.params

    var myquery = { _id: id };
    const result = await User.updateOne( myquery, u )
    const q = await user.findById(req.params.id)
    res.status(201).json( { msg: 'Usuario Actualizado' })
    var transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 587,
      auth: {
          user: 'info@redsai.com.co',
          pass: '123123'
      },
      tls: {rejectUnauthorized: false}
    });    
    const message = "Correo de verificación exitoso"
  
    var mailOptions = {
      from: "Remitente",
      to: q.email,
      subject: message,
      text: "Hola, Te damos la bienvenida a redsai, la aplicación 100% independiente que te ayudara a elegir las mejores propiedades del mercado.",
    };
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.message);
      } else {             
        res.status(200).json(req.body);
      }
    }) 
})

// delete /api/auth/deleteUser/:id
app.delete('/deleteUser/:id', async (req, res) => {       

      const { id }  = req.params
      var myquery = { _id: id };
      const q = await user.findById(req.params.id)
      const result = await User.deleteOne( myquery )
      res.status(201).json( { msg: 'Usuario eliminado' })
      
      var transporter = nodemailer.createTransport({
        host: 'smtp.titan.email',
        port: 587,
        auth: {
            user: 'info@redsai.com.co',
            pass: '123123'
        },
        tls: {rejectUnauthorized: false}
      });
  
      const message = "Correo de verificación fallido"
    
      var mailOptions = {
        from: "Remitente",
        to: q.email,
        subject: message,
        text: "Hola, Se encontraron algunos errores con los datos suministrados por favor envielos de nuevo para realizar nuevamente la revición.",
      };
      
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(info);
          res.status(500).send(error.message);
        } else {      
          console.log(info);
          res.status(200).json(req.body);
        }
      })
})


// get /api/auth/olvidastePassword/:email
app.get('/olvidastePassword/:email', async (req, res) => {  
  const email = req.params.email;
  
  const q = await User.findOne({ email })

  console.log(email);
  const message = 'revise su correo electrónico para obtener un enlace para restablecer su contraseña. ';
  let verificationlink;
  const emailStatus = 'OK';
  
  if (q) {

    const token = createToken(q)    
    verificationlink = `http://www.redsai.com.co/NewPassword/${q.id}-${token}`;
    console.log(verificationlink);
    var transporter = nodemailer.createTransport({
      host: 'smtp.titan.email',
      port: 587,
      auth: {
          user: 'info@redsai.com.co',
          pass: '123123'
      },
      tls: {rejectUnauthorized: false}
    });

    const message = "Cambio de contraseña RedSai"
  
    var mailOptions = {
      from: "Remitente",
      to: email,
      subject: message,
      text: "Hola, ingresa al siguiente link para realizar el cambio de contraseña: " + verificationlink,
    };
    
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error.message)
        res.status(500).send(error.message);
      } else {      
        console.log(req.body)
        res.status(200).json(req.body);
      }
    })   
    //return handleLoginFailed(res)
  
  }else{

    debug(`User with email ${email} not found`)
    res.json({ message });
  }
})


app.put('/new-password/:id', async (req, res) => {  
 
  const { id }  = req.params.id
  const { password } = req.body;

  const q = await user.findById(req.params.id)
  try {      
    const u = {    
      password: hash(password, 10)
    }
    
    var myquery = { _id: q.id };

    const result = await User.updateOne( myquery, u )

    res.status(201).json( { msg: 'password Actualizado' })
  } catch (error) {
    handleError(error, res)
  }     
  var transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 587,
    auth: {
        user: 'info@redsai.com.co',
        pass: '123123'
    },
    tls: {rejectUnauthorized: false}
  });

  const message = "Cambio de contraseña exitoso"

  var mailOptions = {
    from: "Remitente",
    to: q.email,
    subject: message,
    text: "Hola, se realizo el cambio de contraseña exitoso: ",
  };
  console.log("4444444");

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      
      res.status(500).send(error.message);
    } else {      
      
      res.status(200).json(req.body);
    }
  })   

  
})
/*app.get('/admin/user/:id', async (req, res) => {  
  try {     
    const q = await user.findById(req.params.id)    
    res.status(200).json(q);
  } catch (error) {    
    handleError(error, res)
  }  
})*/

function handleLoginFailed(res, message) {
  return res.status(401).json({
    error: message || ' El email y la contraseña no coinciden'
  })
}

export default app
