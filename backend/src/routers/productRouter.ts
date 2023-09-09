import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import {Product, ProductModel } from '../models/productModel'

export const productRouter = express.Router()


// /api/prodcuts
//get product api
productRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await ProductModel.find()
    res.json(products)
  })
)


//create api
productRouter.post(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const createproduct = await ProductModel.create({
      name: req.body.name,
      slug: req.body.slug,
      category: req.body.category,
      image: req.body.image,
      price: req.body.price,
      countInStock:req.body.countInStock,
      brand: req.body.brand,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      description: req.body.description
    } as Product)
    const product = await ProductModel.findOne({ slug: createproduct.slug })
    if (product) {
      res.json(product)
    } else {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  })
)

//get categories
productRouter.get(
  '/categories',
  asyncHandler(async (req: Request, res: Response) => {
    const categories = await ProductModel.find().distinct('category')
    res.json(categories)
  })
)

// one by fetch using slug
// /api/slug/tshirt
productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req, res) => {
    const product = await ProductModel.findOne({ slug: req.params.slug })
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product Not Found' })
    }
  })
)
