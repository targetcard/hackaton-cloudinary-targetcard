import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'https://halloween.targetcard.com.mx'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, cb) => {
      if (acceptedOrigins.includes(origin)) return cb(null, true)

      if (!origin) return cb(null, true)

      return cb(new Error('Not allowed by CORS'))
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization', 'Set-Cookie']
  })
