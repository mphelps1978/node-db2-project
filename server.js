const express = require('express')
const carsRouter = require ('./cars/cars-router')

const server = express()
server.use(express.json())
server.use('/api/cars', carsRouter)

server.get('/', (req,res) =>{
  res.send('<h2>Node DB2 Project</h2><h3>Michael Phelps</h3>')
})

module.exports = server;