import { Router } from 'express'
import { TourController } from '@/controllers/tour.controller'

export class TourRouter {
	public router = Router()

	private tourController = new TourController()

	constructor() {
		this.initilizeRoutes()
	}

	private initilizeRoutes() {
		this.router
			.route('/')
			.get(this.tourController.getAllTours)
			.post(this.tourController.createTour)

		this.router
			.route('/:id')
			.get(this.tourController.getTour)
			.patch(this.tourController.updateTour)
			.delete(this.tourController.deleteTour)
	}
}
