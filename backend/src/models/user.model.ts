import { RowDataPacket } from 'mysql2'

export default interface User extends RowDataPacket {
  id?: number
  fullname?: string
  username?: string
  password?: string
  email?: string
  phone?: string
  address?: string
}
