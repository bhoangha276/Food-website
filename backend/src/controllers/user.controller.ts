import { Request, Response } from 'express'
import User from '../models/user.model'
import userRepository from '../repositories/user.repository'

export default class UserController {
  async create(req: Request, res: Response) {
    try {
      const user: User = req.body
      const savedUser = await userRepository.save(user)

      res.status(201).send(savedUser)
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while retrieving users.',
      })
    }
  }

  async findAll(req: Request, res: Response) {
    const name = typeof req.query.name === 'string' ? req.query.name : ''

    try {
      const users = await userRepository.getAll({ name: name }) // search name_user

      res.status(200).send(users)
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while retrieving users.',
      })
    }
  }

  async findOne(req: Request, res: Response) {
    const id: number = parseInt(req.params.id)

    try {
      const user = await userRepository.getById(id)

      if (user) res.status(200).send(user)
      else
        res.status(404).send({
          message: `Cannot find user with id=${id}.`,
        })
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving User with id=${id}.`,
      })
    }
  }

  async update(req: Request, res: Response) {
    let user: User = req.body
    user.id = parseInt(req.params.id)

    try {
      const num = await userRepository.update(user)

      if (num == 1) {
        res.send({
          message: 'User was updated successfully.',
        })
      } else {
        res.send({
          message: `Cannot update User with id=${user.id}. Maybe User was not found or req.body is empty!`,
        })
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating User with id=${user.id}.`,
      })
    }
  }

  async delete(req: Request, res: Response) {
    const id: number = parseInt(req.params.id)

    try {
      const num = await userRepository.delete(id)

      if (num == 1) {
        res.send({
          message: 'User was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        })
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete User with id==${id}.`,
      })
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await userRepository.deleteAll()

      res.send({ message: `${num} Users were deleted successfully!` })
    } catch (err) {
      res.status(500).send({
        message: 'Some error occurred while removing all users.',
      })
    }
  }
}
