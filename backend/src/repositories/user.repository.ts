import { OkPacket } from 'mysql2'
import connection from '../db'

import User from '../models/user.model'

interface IUserRepository {
  save(user: User): Promise<User>
  getAll(searchParams: { name: string }): Promise<User[]>
  getById(userId: number): Promise<User | undefined>
  update(user: User): Promise<number>
  delete(userId: number): Promise<number>
  deleteAll(): Promise<number>
}

class UserRepository implements IUserRepository {
  save(user: User): Promise<User> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        'INSERT INTO tbl_users (fullname, username, password, email, phone, address) VALUES(?,?,?,?,?,?)',
        [user.fullname, user.username, user.password, user.email, user.phone, user.address],
        (err, res) => {
          if (err) reject(err)
          else
            this.getById(res.insertId)
              .then(user => resolve(user!))
              .catch(reject)
        },
      )
    })
  }

  getAll(searchParams: { name?: string }): Promise<User[]> {
    let query: string = 'SELECT * FROM tbl_users'
    let condition: string = ''

    if (searchParams?.name) condition += `LOWER(name_user) LIKE '%${searchParams.name}%'`

    if (condition.length) query += ' WHERE ' + condition

    return new Promise((resolve, reject) => {
      connection.query<User[]>(query, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }

  getById(userId: number): Promise<User> {
    return new Promise((resolve, reject) => {
      connection.query<User[]>('SELECT * FROM tbl_users WHERE id = ?', [userId], (err, res) => {
        if (err) reject(err)
        else resolve(res?.[0])
      })
    })
  }

  update(user: User): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        'UPDATE tbl_users SET fullname = ?, username = ?, password = ?, email = ?, phone = ?, address = ? WHERE id = ?',
        [
          user.fullname,
          user.username,
          user.password,
          user.email,
          user.phone,
          user.address,
          user.id,
        ],
        (err, res) => {
          if (err) reject(err)
          else resolve(res.affectedRows)
        },
      )
    })
  }

  delete(userId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>('DELETE FROM tbl_users WHERE id = ?', [userId], (err, res) => {
        if (err) reject(err)
        else resolve(res.affectedRows)
      })
    })
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>('DELETE FROM tbl_users', (err, res) => {
        if (err) reject(err)
        else resolve(res.affectedRows)
      })
    })
  }
}

export default new UserRepository()
