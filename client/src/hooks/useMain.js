import { useEffect, useState } from 'react'

export const useMain = () => {
  const horrorTexts = ['TARGET CARD', 'CLOUDINARY', 'HALLOWEEN', 'HORROR']
  const [message, setMessage] = useState('¡Cuidado! Hay algo detrás de ti...')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)

  const scaryMessages = [
    '¡Cuidado! Hay algo detrás de ti...',
    'Los espíritus te están observando',
    '¿Escuchaste ese ruido?',
    'No mires a las sombras',
    'Esta noche, las pesadillas se hacen realidad'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(
        scaryMessages[Math.floor(Math.random() * scaryMessages.length)]
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const showText = () => {
      setShowAnimation(false)
      setTimeout(() => {
        setShowAnimation(true)
      }, 2000)
    }

    const animateText = () => {
      const nextIndex = (currentIndex + 1) % horrorTexts.length
      setCurrentIndex(nextIndex)
      showText()
    }

    showText()
    const intervalId = setInterval(animateText, 3200)

    return () => clearInterval(intervalId)
  }, [currentIndex, horrorTexts.length])

  const handleDownSection = () => {
    window.scrollTo({ top: 200, behavior: 'smooth' })
  }

  return {
    horrorTexts,
    currentIndex,
    showAnimation,
    message,
    handleDownSection
  }
}
