import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './config/db.js'
import route from './routes/userRoutes.js'

const app=express()
const port=process.env.PORT
const DB_URI=process.env.DB_URI

app.use(cors())
app.use(express.json())

app.use('/',route)
connectDB(DB_URI)
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})