import crypto from 'node:crypto'
import express from 'express'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
import { corsMiddleware } from './cors.js'

dotenv.config()

const app = express()
const port = 3000 ?? process.env.PORT

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

app.use(corsMiddleware())

app.get('/api/get-images', async (req, res) => {
  try {
    const result = await cloudinary.v2.api.resources_by_tag('target_tag')
    res.json(result.resources)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las imágenes' })
  }
})

app.post('/api/upload', async (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000)
  const tags = 'target_tag'
  const upload_preset = 'target'

  const signatureString = `tags=${tags}&timestamp=${timestamp}&upload_preset=${upload_preset}${process.env.CLOUD_API_SECRET}`
  const signature = crypto
    .createHash('sha1')
    .update(signatureString)
    .digest('hex')

  res.json({ signature, timestamp })
})

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) {
    return next()
  }
  res.sendFile(path.resolve('dist', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
