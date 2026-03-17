import express from 'express'
import type { Express } from 'express'
import morgan from 'morgan'
import { userRouter } from '@/routes/user.routes'
import { dotenvConfig } from './config/env'

export class App {
    public readonly app: Express

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
    }

    private setupRoutes(): void {
        this.app.use('/api/v1/users', userRouter)
    }
}
