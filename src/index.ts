import { Database } from './database/database'
import { dotenvConfig } from './config/env'
import { App } from './app'
import { localPort, protocols } from './constants/constants'

const port = dotenvConfig.port || localPort

class Server extends App {
	constructor() {
		super()
	}

	public async listen(port: number | string) {
		await Database.getInstance().connect()

		this.app.listen(port, () => {
			console.log(`✅ Настроен порт: ${protocols.http}://localhost:${port} `)
		})
	}
}

const server: Server = new Server()
server.listen(port)
