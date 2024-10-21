import { useEffect, useRef, useState } from 'react'
import '../assets/css/Gallery.css'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import audioMusic from '../assets/audio/musica-galeria.m4a'
import { API_GET } from '../config'

export default function Gallery() {
  const audioRef = useRef(null)
  const [images, setImages] = useState([])

  const fetchImagesByTag = async () => {
    try {
      const response = await fetch(API_GET)

      const data = await response.json()
      setImages(data.map((image) => image.secure_url))
    } catch {
      console.error('Error al obtener las imágenes por tag:')
    }
  }

  useEffect(() => {
    audioRef.current.play()

    fetchImagesByTag()
  }, [])

  return (
    <>
      <Helmet>
        <title>Galería | Halloween Target Card</title>
      </Helmet>

      <audio loop ref={audioRef}>
        <source src={audioMusic} type='audio/mp3' />
        Your browser does not support the audio element.
      </audio>

      <Link to='/' className='btn-galery in-galery'>
        🔙 Volver
      </Link>
      <div className='halloween-container'>
        <div className='gallery-container'>
          <h1 className='gallery-title'>Galería del Terror</h1>
          {images.length > 0 ? (
            <div className='image-grid'>
              {images.map((src, index) => (
                <div key={index} className='image-wrapper'>
                  <img
                    src={src}
                    alt={`Halloween image ${index + 1}`}
                    className='gallery-image'
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='not-image'>
              <h2>
                Cargando <span>.</span>
                <span>.</span>
                <span>.</span>
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
