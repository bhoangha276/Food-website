import { RowDataPacket } from 'mysql2'

export default interface Product extends RowDataPacket {
  id?: number
  name?: string
  price?: number
  img?: string
  category?: string
}
