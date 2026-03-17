import { config } from 'dotenv'

config({ path: './config.env' })

const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue
    if (!value) {
        throw new Error(`❌ Ошибка конфигурации: Переменная ${key} не задана в .env`)
    }
    return value
}

export const dotenvConfig = {
    port: parseInt(getEnv('PORT', '3000'), 10),
    nodeEnv: getEnv('NODE_ENV', 'development'),
    isDev: getEnv('NODE_ENV', 'development') === 'development'
} as const
