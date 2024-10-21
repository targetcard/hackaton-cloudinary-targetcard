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
    const result = await cloudinary.v2.api.resources_by_tag(
      process.env.CLOUD_TAG
    )
    res.json(result.resources)
  } catch (error) {
    res.status(500).json({ error })
  }
})

app.post('/api/upload', async (req, res) => {
  const timestamp = Math.floor(Date.now() / 1000)
  const tags = process.env.CLOUD_TAG
  const upload_preset = process.env.CLOUD_UPLOAD_PRESET

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
