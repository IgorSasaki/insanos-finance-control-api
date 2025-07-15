import cors from 'cors'
import express from 'express'

import { env } from './env.ts'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_, response) => {
  response.json({
    message: 'Insanos Finance Control API is running!',
    success: true,
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

app.listen({ port: env.PORT }, () => {
  console.log(`HTTP Server running in port ${env.PORT}! 🚀🚀`)
})
