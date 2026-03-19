import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/utils/app.error'

export class GlobalErrorController {
	private static handleCastErrorDB(err: any): AppError {
		const message = `Invalid ${err.path}: ${err.value}.`
		return new AppError(message, 400)
	}

	private static handleDuplicateFieldsDB(err: any): AppError {
		const value = err.errmsg.match(/(["'])(\\?.)*?\1/)?.[0]
		const message = `Duplicate field value: ${value}. Please use another value!`
		return new AppError(message, 400)
	}

	private static handleValidationErrorDB(err: any): AppError {
		const errors = Object.values(err.errors).map((el: any) => el.message)
		const message = `Invalid input data. ${errors.join('. ')}`
		return new AppError(message, 400)
	}

	private static handleJWTError = (): AppError =>
		new AppError('Invalid token. Please log in again!', 401)

	private static handleJWTExpiredError = (): AppError =>
		new AppError('Your token has expired! Please log in again.', 401)

	private static sendErrorDev(err: AppError, res: Response): void {
		res.status(err.statusCode || 500).json({
			status: err.status || 'error',
			error: err,
			message: err.message,
			stack: err.stack
		})
	}

	private static sendErrorProd(err: AppError, res: Response): void {
		if (err.isOperational) {
			res.status(err.statusCode).json({
				status: err.status,
				message: err.message
			})
		} else {
			console.error('ERROR 💥', err)
			res.status(500).json({
				status: 'error',
				message: 'Something went very wrong!'
			})
		}
	}

	public static globalHandler = (
		err: any,
		_req: Request,
		res: Response,
		_next: NextFunction
	): void => {
		err.statusCode = err.statusCode || 500
		err.status = err.status || 'error'

		if (process.env.NODE_ENV === 'development') {
			this.sendErrorDev(err, res)
		} else {
			let error = { ...err, message: err.message, name: err.name }

			if (error.name === 'CastError') error = this.handleCastErrorDB(error)
			if (error.code === 11000) error = this.handleDuplicateFieldsDB(error)
			if (error.name === 'ValidationError')
				error = this.handleValidationErrorDB(error)
			if (error.name === 'JsonWebTokenError') error = this.handleJWTError()
			if (error.name === 'TokenExpiredError') error = this.handleJWTExpiredError()

			this.sendErrorProd(error, res)
		}
	}
}
