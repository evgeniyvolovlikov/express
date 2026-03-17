import type { Request, Response } from 'express'

export class TourController {
	public getAllTours = (_req: Request, res: Response): void => {
		res.json({
			status: 'ok',
			data: []
		})
	}
}
