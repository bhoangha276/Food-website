import { Router } from 'express'
import UserController from '../controllers/user.controller'

class UserRoutes {
  router = Router()
  controller = new UserController()

  constructor() {
    this.intializeRoutes()
  }

  intializeRoutes() {
    // Create a new User
    this.router.post('/', this.controller.create)

    // Get all Users & filter name
    this.router.get('/', this.controller.findAll)

    // Get a User by id
    this.router.get('/:id', this.controller.findOne)

    // Update a User by id
    this.router.put('/:id', this.controller.update)

    // Delete a User by id
    this.router.delete('/:id', this.controller.delete)

    // Delete all Users
    this.router.delete('/delete-all', this.controller.deleteAll)
  }
}

export default new UserRoutes().router
