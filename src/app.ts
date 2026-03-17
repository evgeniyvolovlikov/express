import express from 'express'
import type { Express } from 'express'
import morgan from 'morgan'
import { UserRouter } from '@/routes/user.routes'
import { TourRouter } from '@/routes/tour.routes'
import { dotenvConfig } from './config/env'

export class App {
    public readonly app: Express
	private readonly tourRouter = new TourRouter()
	private readonly userRouter = new UserRouter()

    constructor() {
        this.app = express()
        this.setupMiddlewares()
        this.setupRoutes()
    }

    private setupMiddlewares(): void {
        if (dotenvConfig.isDev) {
            this.app.use(morgan('dev'))
        }

        this.app.use(express.json())

		this.app.use((_req, _res, next) => {
			console.log('middleware: initialization')
			next()
		})
    }

    private setupRoutes(): void {
        this.app.use('/api/v1/users', this.userRouter.router)
		this.app.use('/api/v1/tours', this.tourRouter.router)
    }
}
