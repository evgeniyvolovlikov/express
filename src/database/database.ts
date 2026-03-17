import mongoose from 'mongoose'
import { replaceValueFromString } from '@/utils/replace-value-from-string'
import { dotenvConfig } from '../config/env'

export class Database {
    private static instance: Database

    private constructor() {}

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }

    public async connect(): Promise<void> { 
        const rawUri = dotenvConfig.database || ''
        
        const dbUri = replaceValueFromString(rawUri, {
            '<DATABASE_USER>': dotenvConfig.databaseUser,
            '<DATABASE_PASSWORD>': dotenvConfig.databasePassword
        })

        if (!dbUri.includes('mongodb')) {
            throw new Error('Ошибка: Некорректный URI базы данных');
        }

        try {
            await mongoose.connect(dbUri)
            console.log('✅ База данных успешно подключена')
        } catch(error) {
            console.error('❌ Ошибка при подключении к БД:', error)
            process.exit(1)
        }
    }
}
