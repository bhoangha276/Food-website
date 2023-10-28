import { Request, Response } from 'express'
import Product from '../models/product.model'
import productRepository from '../repositories/product.repository'

export default class ProductController {
  async create(req: Request, res: Response) {
    try {
      const product: Product = req.body
      const savedProduct = await productRepository.save(product)

      res.status(201).send(savedProduct)
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while retrieving products.',
      })
    }
  }

  async findAll(req: Request, res: Response) {
    const name = typeof req.query.name === 'string' ? req.query.name : ''

    try {
      const products = await productRepository.getAll({ name: name }) // search name_product

      res.status(200).send(products)
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while retrieving products.',
      })
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id)

    try {
      const product = await productRepository.getById(id)

      if (product) res.status(200).send(product)
      else
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`,
        })
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving Product with id=${id}.`,
      })
    }
  }

  async update(req: Request, res: Response) {
    let product: Product = req.body
    product.id = parseInt(req.params.id)

    try {
      const num = await productRepository.update(product)

      if (num == 1) {
        res.send({
          message: 'Product was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update Product with id=${product.id}. Maybe Product was not found or req.body is empty!`,
        })
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating Product with id=${product.id}.`,
      })
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id)

    try {
      const num = await productRepository.delete(id)

      if (num == 1) {
        res.send({
          message: 'Product was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        })
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Product with id==${id}.`,
      })
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await productRepository.deleteAll()

      res.send({ message: `${num} Products were deleted successfully!` })
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while removing all products.',
      })
    }
  }
}
