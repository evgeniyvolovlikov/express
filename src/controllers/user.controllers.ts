import type { Request, Response } from 'express'

export class UserController {
    public getAllUsers = (_req: Request, res: Response): void => {
        res.json({
            status: 'ok',
            data: []
        })
    }
}
