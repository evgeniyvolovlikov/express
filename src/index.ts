import { dotenvConfig } from './config/env'
import { App } from './app'
import { localPort, protocols } from './constants/constants'

const port = dotenvConfig.port || localPort

class Server extends App {
    constructor() {
        super()
    }

    public listen(port: number | string) {
        this.app.listen(port, () => {
            console.log(`Настроен порт: ${protocols.http}://localhost:${port} `)
        })
    }
}

const server: Server = new Server()
server.listen(port)
