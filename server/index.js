import http from 'http'
import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { mongoUrl,port } from './config'

const debug = new Debug('Inmobiliaria:root')

async function start() {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true
  })
  .then(console.log(`DB is connected`+mongoUrl+port))
  .catch(err => console.error(err));

  app.listen(port, () => {
    debug(`Server running at port ${port}`)
  })
}

start()