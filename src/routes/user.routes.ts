import { Router } from 'express'
import { UserController } from '../controllers/user.controllers'

const router = Router()
const userController = new UserController()

router.route('/').get(userController.getAllUsers)

export { router as userRouter }
