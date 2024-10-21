import { useState } from 'react'

export const useJumpScare = (audioRef) => {
  const [showJumpScare, setShowJumpScare] = useState(false)

  const handleJumpScare = () => {
    setShowJumpScare(true)
    audioRef.current.currentTime = 2
    audioRef.current.volume = 1
    audioRef.current.play()

    setTimeout(() => {
      setShowJumpScare(false)
      audioRef.current.pause()
    }, 2000)
  }

  return { showJumpScare, handleJumpScare }
}
