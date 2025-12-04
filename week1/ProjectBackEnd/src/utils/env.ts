import dotenv from 'dotenv'


dotenv.config

export default {
    HOST:process.env.HOST || 'http://localhost',
    PORT:process.env.PORT || 5000,
    NODE_ENV:process.env.NODE_ENV
} as const