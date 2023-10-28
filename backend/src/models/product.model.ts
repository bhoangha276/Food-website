import { RowDataPacket } from 'mysql2'

export default interface Product extends RowDataPacket {
  id?: number
  title?: string
  description?: string
  published?: boolean
}
