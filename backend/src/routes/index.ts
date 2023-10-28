import { Application } from 'express'
import productRoutes from './product.routes'
import homeRoutes from './home.routes'

export default class Routes {
  constructor(app: Application) {
    app.use('/api', homeRoutes)
    app.use('/api/products', productRoutes)
  }
}
