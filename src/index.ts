import { Database } from './database/database'
import { dotenvConfig } from './config/env'
import { App } from './app'
import { localPort, protocols } from './constants/constants'
import { Server as HttpServer } from 'http'

const port = dotenvConfig.port || localPort

class Server extends App {
	private serverInstance?: HttpServer

	constructor() {
		super()
		this.setupGlobalErrorHandling()
	}

	private setupGlobalErrorHandling() {
		process.on('uncaughtException', (err: Error) => {
			console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...')
			console.error(err.name, err.message)
			process.exit(1)
		})
	}

	public async listen(port: number | string) {
		try {
			await Database.getInstance().connect()

			this.serverInstance = this.app.listen(port, () => {
				console.log(`✅ Настроен порт: ${protocols.http}://localhost:${port}`)
			})

			this.setupRejectionHandling()
		} catch (error) {
			console.error('❌ Failed to start server:', error)
			process.exit(1)
		}
	}

	private setupRejectionHandling() {
		process.on('unhandledRejection', (err: Error) => {
			console.error('UNHANDLED REJECTION! 💥 Shutting down...')
			console.error(err.name, err.message)

			if (this.serverInstance) {
				this.serverInstance.close(() => {
					process.exit(1)
				})
			} else {
				process.exit(1)
			}
		})
	}
}

const server: Server = new Server()
server.listen(port)
