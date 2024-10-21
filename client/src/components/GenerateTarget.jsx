import { useRef, useState } from 'react'
import { AdvancedImage } from '@cloudinary/react'
import { IoMdDownload } from 'react-icons/io'
import { CgSpinnerAlt } from 'react-icons/cg'
import { Cloudinary } from '@cloudinary/url-gen'
import { toast } from 'sonner'
import {
  API_POST,
  CLOUD_API_KEY,
  CLOUD_NAME,
  CLOUD_TAGS,
  CLOUD_UPLOAD_PRESET
} from '../config'

export function GenerateTarget() {
  const musicRef = useRef(null)
  const videoRef = useRef(null)

  const [loadingDownload, setLoadingDownload] = useState(false)
  const [imageUpload, setImageUpload] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tarjeta, setTarjeta] = useState(null)
  const [create, setCreate] = useState(false)
  const [text, setText] = useState('')

  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUD_NAME
    }
  })

  const generateBlob = async () => {
    if (tarjeta !== null) {
      const response = await fetch(tarjeta?.toURL())
      const blob = await response.blob()

      return blob
    }
  }

  const handleSubmit = () => {
    if (text === '') {
      toast.error('Debes ingresar un texto')
      return
    }

    musicRef.current.play()
    videoRef.current.play()
    setLoading(true)
    setCreate(false)

    let newText = text.replaceAll(' ', '%20')
    newText = newText.replaceAll(',', '%2C')

    const img = cld.image('targetcard/tarjeta')
    img.addTransformation(
      `e_gen_background_replace:prompt_${newText}/f_auto/q_auto`
    )

    setTarjeta(img)
  }

  const handleImageLoad = async () => {
    musicRef.current.pause()
    videoRef.current.pause()
    setLoading(false)
    setCreate(true)
  }

  const handleError = () => {
    handleSubmit()
  }

  const handleDownload = async () => {
    setLoadingDownload(true)
    try {
      if (tarjeta !== null) {
        const blob = await generateBlob()

        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `${text}.webp`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
      setLoadingDownload(false)
    } catch (error) {
      setLoadingDownload(false)
      console.error('Error al descargar la imagen:', error)
    }
  }

  const uploadCloudinary = async () => {
    setImageUpload(true)
    const blob = await generateBlob()

    const response = await fetch(API_POST, { method: 'POST' })
    const { signature, timestamp } = await response.json()

    const formData = new FormData()
    formData.append('file', blob)
    formData.append('upload_preset', CLOUD_UPLOAD_PRESET)
    formData.append('tags', CLOUD_TAGS)
    formData.append('timestamp', timestamp)
    formData.append('signature', signature)
    formData.append('api_key', CLOUD_API_KEY)

    fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload?quality=auto&fetch_format=webp`,
      {
        method: 'POST',
        body: formData
      }
    )
      .then((response) => {
        if (response.ok) {
          toast.success('Imagen subida correctamente, ve a la galería.')
        } else {
          toast.error('Error al subir la imagen')
        }
        setImageUpload(false)
      })
      .catch((error) => {
        console.error('Error al subir la imagen:', error)
        toast.error('Error al subir la imagen')
        setImageUpload(false)
      })
  }

  return (
    <>
      <audio ref={musicRef} loop>
        <source
          src='https://res.cloudinary.com/targetcard/video/upload/v1729056839/targetcard/halloween-music.mp4'
          type='audio/mp3'
        />
      </audio>

      <div className='card-preview-section'>
        <div className='card-preview'>
          <h3>Tarjeta NFC Predeterminada</h3>
          <img
            src='https://res.cloudinary.com/targetcard/image/upload/v1728965188/targetcard/tarjeta.png'
            alt='Tarjeta predeterminada'
            className='card-image'
          />
        </div>
        <div className='card-preview'>
          <h3>
            {loading
              ? 'Tu tarjeta aparecerá aquí (Cargando...), por mientras te dejo un video.'
              : create
              ? 'Tu Tarjeta NFC Terrorífica'
              : 'Tu tarjeta aparecerá aquí'}
          </h3>
          <div className='container-advanced-gif'>
            <video
              ref={videoRef}
              loop
              className='card-image advanced-gif'
              style={{
                transition: 'all 0.5s ease-in-out',
                opacity: create ? 0 : 1,
                zIndex: create ? -1 : 100
              }}
            >
              <source
                src='https://res.cloudinary.com/targetcard24/video/upload/f_auto:video,q_auto/v1/targetcard/jzmnr4nvl2w9ts6zjyuh'
                type='video/mp4'
              />
            </video>
            <AdvancedImage
              cldImg={tarjeta}
              width={600}
              height={300}
              onLoad={handleImageLoad}
              onError={handleError}
              alt='Tarjeta generada'
              className='card-image advanced-gif'
              style={{
                transition: 'all 0.5s ease-in-out',
                opacity: create ? 1 : 0,
                zIndex: create ? 100 : -1
              }}
            />

            {create && (
              <button
                className='download-button'
                title='Descargar tarjeta'
                onClick={handleDownload}
              >
                {loadingDownload ? (
                  <CgSpinnerAlt className='loading-download' />
                ) : (
                  <IoMdDownload />
                )}
              </button>
            )}
          </div>
          {create && (
            <button
              className='btn-subir'
              title='Subir tarjeta a Cloudinary'
              onClick={uploadCloudinary}
            >
              {imageUpload && <CgSpinnerAlt className='loading-download' />}
              Subir a cloudinary
            </button>
          )}
        </div>
      </div>

      <div className='content-section'>
        <div className='input-section'>
          <span className='alert-eye'>
            OJO, la música te indicará cuando esté lista.
          </span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Describe tu diseño de tarjeta de Halloween aquí...'
          />
          <button onClick={handleSubmit}>Generar Diseño Terrorífico</button>
        </div>
        <div className='explanation-section'>
          <h2>Crea tu Tarjeta de Pesadilla</h2>
          <p>
            Escribe un breve texto con temática de Halloween para personalizar
            tu tarjeta Target Card. ¿Quieres calabazas sonrientes? ¿Fantasmas
            traviesos? ¿O prefieres demonios? Mientras más breve la descripción,
            más probable es que el resultado sea satisfactorio.
          </p>
        </div>
      </div>
    </>
  )
}
