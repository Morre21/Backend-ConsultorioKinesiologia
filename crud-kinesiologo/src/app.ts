import express from 'express'
import { kinesiologoRouter } from './kinesiologo/kinesiologo.routes.js'

const app = express()
app.use(express.json())

app.use('/api/kinesiologos', kinesiologoRouter)

app.use((req, res)=>{
    res.status(404).send({message: 'Resource not found'})
})

app.listen(3000, ()=>{
    console.log('server running on http://localhost:3000/')
})