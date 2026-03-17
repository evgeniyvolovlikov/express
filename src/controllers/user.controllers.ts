import type { Request, Response } from 'express'

export class UserController {
	public getAllUsers = (_req: Request, res: Response): void => {
		res.status(500).json({
			status: 'error',
			message: 'This route is not yet defined!'
		})
	}

	public getUser = (_req: Request, res: Response): void => {
		res.status(500).json({
			status: 'error',
			message: 'This route is not yet defined!'
		})
	}

	public createUser = (_req: Request, res: Response): void => {
		res.status(500).json({
			status: 'error',
			message: 'This route is not yet defined!'
		})
	}

	public updateUser = (_req: Request, res: Response): void => {
		res.status(500).json({
			status: 'error',
			message: 'This route is not yet defined!'
		})
	}

	public deleteUser = (_req: Request, res: Response): void => {
		res.status(500).json({
			status: 'error',
			message: 'This route is not yet defined!'
		})
	}
}
