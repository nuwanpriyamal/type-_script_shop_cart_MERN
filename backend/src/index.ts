import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import path from 'path'
import { orderRouter } from './routers/orderRouter'
import { productRouter } from './routers/productRouter'
import { userRouter } from './routers/userRouter'

dotenv.config()
// mongo db connection 
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost/nuwanmongodb'
mongoose.set('strictQuery', true)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to mongodb successfully')
  })
  .catch(() => {
    console.log('error mongodb')
  })
// enbling cors
const app = express()
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
)
// end points connecr with router
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)



// running port server start
const PORT: number = parseInt((process.env.PORT || '4000') as string, 10)

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`)
})
