import fs from 'fs'
import type { Request, Response } from 'express'
import tours from 'data/tours.simple.json'

export class TourController {
	public getAllTours = (_req: Request, res: Response): void => {
		res.status(200).json({
			status: 'success',
    		results: tours.length,
			data: tours
		})
	}

	public getTour = (req: Request, res: Response): void => {
		console.log(req.params)
		const id: number = +req.params.id
		const tour = tours.find(el => el.id === id)

		res.status(200).json({
			status: 'success',
			data: {
				tour
			}
		})
	}

	public createTour = (req: Request, res: Response) => {
		const newId = +tours[tours.length - 1].id + 1
		const newTour = Object.assign({ id: newId }, req.body)
		tours.push(newTour)

		fs.writeFile(
			`data/tours.simple.json`,
			JSON.stringify(tours),
			() => {
				res.status(201).json({
					status: 'success',
					data: {
						tour: newTour
					}
				})
			}
		)
	}

	public updateTour = (_req: Request, res: Response) => {
		res.status(200).json({
			status: 'success',
			data: {
				tour: '<Updated tour here...>'
			}		
		})
	}

	public deleteTour = (_req: Request, res: Response) => {
		res.status(204).json({
    		status: 'success',
    		data: null
  		})
	}
}
