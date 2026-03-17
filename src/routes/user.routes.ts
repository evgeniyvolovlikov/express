import { Router } from 'express'
import { UserController } from '@/controllers/user.controllers'

export class UserRouter {
	public router = Router()

	private userController = new UserController()

	constructor() {
		this.initilizeRoutes()
	}

	private initilizeRoutes() {
		this.router
			.route('/')
			.get(this.userController.getAllUsers)
			.post(this.userController.createUser)

		this.router
			.route('/:id')
			.get(this.userController.getUser)
			.patch(this.userController.updateUser)
			.delete(this.userController.deleteUser)
	}
}
