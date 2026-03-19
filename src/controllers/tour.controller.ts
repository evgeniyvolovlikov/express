import type { Request, Response } from 'express'
import { Tour } from '@/models/tour.model'
import { APIFeatures } from '@/utils/api.features/api.features'

export class TourController {
	public getAllTours = async (req: Request, res: Response) => {
		try {
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
		} catch (err) {
			res.status(404).json({
				status: 'fail',
				message: err
			})
		}
	}

	public getTour = async (req: Request, res: Response) => {
		try {
			const id = req.params.id
			const tour = await Tour.findById(id)
			// Tour.findOne({ _id: req.params.id })

			res.status(200).json({
				status: 'success',
				data: {
					tour
				}
			})
		} catch (err) {
			res.status(404).json({
				status: 'fail',
				message: err
			})
		}
	}

	public createTour = async (req: Request, res: Response) => {
		try {
			const newTour = await Tour.create(req.body)
			res.status(201).json({
				status: 'success',
				data: {
					tour: newTour
				}
			})
		} catch (err) {
			res.status(400).json({
				status: 'fail',
				message: err
			})
		}
	}

	public updateTour = async (req: Request, res: Response) => {
		try {
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
		} catch (err) {
			res.status(404).json({
				status: 'fail',
				message: err
			})
		}
	}

	public deleteTour = async (req: Request, res: Response) => {
		try {
			const id = req.params.id
			const tour = await Tour.findByIdAndDelete(id)

			res.status(200).json({
				status: 'success',
				data: {
					deletedTour: tour
				}
			})
		} catch (err) {
			res.status(404).json({
				status: 'fail',
				message: err
			})
		}
	}
}
