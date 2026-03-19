import type { Request, Response, NextFunction } from 'express'
import { Tour } from '@/models/tour.model'
import { APIFeatures } from '@/utils/api.features/api.features'
import { AsyncHandler } from '@/utils/catch.async'

export class TourController {
	public getAllTours = AsyncHandler.catchAsync(
		async (req: Request, res: Response, _next: NextFunction) => {
			const features = new APIFeatures(Tour.find(), req.query)
				.filter()
				.sort()
				.limitFields()
				.paginate()

			const tours = await features.query

			res.status(200).json({
				status: 'success',
				results: tours.length,
				data: {
					tours
				}
			})
		}
	)

	public getTour = AsyncHandler.catchAsync(async (req: Request, res: Response) => {
		const id = req.params.id
		const tour = await Tour.findById(id)

		res.status(200).json({
			status: 'success',
			data: {
				tour
			}
		})
	})

	// throw new AppError('Упс! Туры временно недоступны', 400);

	public createTour = AsyncHandler.catchAsync(async (req: Request, res: Response) => {
		const newTour = await Tour.create(req.body)
		res.status(201).json({
			status: 'success',
			data: {
				tour: newTour
			}
		})
	})

	public updateTour = AsyncHandler.catchAsync(async (req: Request, res: Response) => {
		const id = req.params.id
		const tour = await Tour.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true
		})

		res.status(200).json({
			status: 'success',
			data: {
				tour
			}
		})
	})

	public deleteTour = AsyncHandler.catchAsync(async (req: Request, res: Response) => {
		const id = req.params.id
		const tour = await Tour.findByIdAndDelete(id)

		res.status(200).json({
			status: 'success',
			data: {
				deletedTour: tour
			}
		})
	})
}
