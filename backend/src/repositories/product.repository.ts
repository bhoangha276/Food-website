import { OkPacket } from 'mysql2'
import connection from '../db'

import Product from '../models/product.model'

interface IProductRepository {
  save(product: Product): Promise<Product>
  getAll(searchParams: { name: string }): Promise<Product[]>
  getById(productId: number): Promise<Product | undefined>
  update(product: Product): Promise<number>
  delete(productId: number): Promise<number>
  deleteAll(): Promise<number>
}

class ProductRepository implements IProductRepository {
  save(product: Product): Promise<Product> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        'INSERT INTO tbl_products (name_product, price_product, img_product, category_product) VALUES(?,?,?,?)',
        [product.name, product.price, product.img, product.category],
        (err, res) => {
          if (err) reject(err)
          else
            this.getById(res.insertId)
              .then(product => resolve(product!))
              .catch(reject)
        },
      )
    })
  }

  getAll(searchParams: { name?: string }): Promise<Product[]> {
    let query: string = 'SELECT * FROM tbl_products'
    let condition: string = ''

    if (searchParams?.name) condition += `LOWER(name_product) LIKE '%${searchParams.name}%'`

    if (condition.length) query += ' WHERE ' + condition

    return new Promise((resolve, reject) => {
      connection.query<Product[]>(query, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }

  getById(productId: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      connection.query<Product[]>(
        'SELECT * FROM tbl_products WHERE id = ?',
        [productId],
        (err, res) => {
          if (err) reject(err)
          else resolve(res?.[0])
        },
      )
    })
  }

  update(product: Product): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        'UPDATE tbl_products SET name_product = ?, 	price_product = ?, img_product = ?, category_product = ? WHERE id = ?',
        [product.name, product.price, product.img, product.category, product.id],
        (err, res) => {
          if (err) reject(err)
          else resolve(res.affectedRows)
        },
      )
    })
  }

  delete(productId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>(
        'DELETE FROM tbl_products WHERE id = ?',
        [productId],
        (err, res) => {
          if (err) reject(err)
          else resolve(res.affectedRows)
        },
      )
    })
  }

  deleteAll(): Promise<number> {
    return new Promise((resolve, reject) => {
      connection.query<OkPacket>('DELETE FROM tbl_products', (err, res) => {
        if (err) reject(err)
        else resolve(res.affectedRows)
      })
    })
  }
}

export default new ProductRepository()
