import { Application } from 'express'
import productRoutes from './product.routes'
import userRoutes from './user.routes'
import homeRoutes from './home.routes'

export default class Routes {
  constructor(app: Application) {
    app.use('/api', homeRoutes)
    app.use('/api/products', productRoutes)
    app.use('/api/users', userRoutes)
  }
}
