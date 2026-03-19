import express, {
	Express,
	Request,
	Response,
	NextFunction,
	RequestHandler
} from 'express'
import morgan from 'morgan'
import { UserRouter } from '@/routes/user.routes'
import { TourRouter } from '@/routes/tour.routes'
import { dotenvConfig } from './config/env'
import { AppError } from './utils/app.error'
import { GlobalErrorController } from './controllers/error.controller'

export class App {
	public readonly app: Express
	private readonly tourRouter = new TourRouter()
	private readonly userRouter = new UserRouter()

	constructor() {
		this.app = express()
		this.setupMiddlewares()
		this.setupRoutes()
		this.setupErrorHandling()
	}

	private setupMiddlewares(): void {
		if (dotenvConfig.isDev) {
			this.app.use(morgan('dev'))
		}

		this.app.use(express.json())

		this.app.use((_req: Request, _res: Response, next: NextFunction) => {
			console.log('middleware: initialization')
			next()
		})
	}

	private setupErrorHandling(): void {
		const notFoundHandler: RequestHandler = (
			req: Request,
			_res: Response,
			next: NextFunction
		) => {
			next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
		}

		this.app.all(/th*/, notFoundHandler)

		this.app.use(GlobalErrorController.globalHandler)
	}

	private setupRoutes(): void {
		this.app.use('/api/v1/users', this.userRouter.router)
		this.app.use('/api/v1/tours', this.tourRouter.router)
	}
}
