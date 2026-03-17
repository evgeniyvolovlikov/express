import { Router } from 'express'
import { TourController } from '@/controllers/tour.controller'

const router = Router()
const tourController = new TourController()

router.route('/').get(tourController.getAllTours)

export { router as tourRouter }
