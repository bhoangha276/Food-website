import { Router } from 'express'
import ProductController from '../controllers/product.controller'

class ProductRoutes {
  router = Router()
  controller = new ProductController()

  constructor() {
    this.intializeRoutes()
  }

  intializeRoutes() {
    // Create a new Product
    this.router.post('/', this.controller.create)

    // Get all Products & filter name
    this.router.get('/', this.controller.findAll)

    // Get a Product by id
    this.router.get('/:id', this.controller.findOne)

    // Update a Product by id
    this.router.put('/:id', this.controller.update)

    // Delete a Product by id
    this.router.delete('/:id', this.controller.delete)

    // Delete all Products
    this.router.delete('/delete-all', this.controller.deleteAll)
  }
}

export default new ProductRoutes().router
