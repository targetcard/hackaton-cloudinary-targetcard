import { useJumpScare } from '../hooks/useJumpScare'
import { useMain } from '../hooks/useMain'
import { GiLongLeggedSpider } from 'react-icons/gi'
import audioScare from '../assets/audio/audio-scare.mp4'
import { useRef } from 'react'
import { JumpScare } from './JumpScare'

export function Main() {
  const audioRef = useRef(null)
  const { handleJumpScare, showJumpScare } = useJumpScare(audioRef)

  const {
    horrorTexts,
    currentIndex,
    showAnimation,
    message,
    handleDownSection
  } = useMain()

  return (
    <>
      <audio ref={audioRef}>
        <source src={audioScare} type='audio/mp3' />
      </audio>

      <div className='main-image'>
        <div className='horror-text-layer'>
          {horrorTexts.map((text, index) => (
            <h2
              key={index}
              className={
                currentIndex === index
                  ? showAnimation
                    ? 'animate'
                    : ''
                  : 'animate-hide'
              }
            >
              {text}
            </h2>
          ))}
        </div>
        <p className='scary-message'>{message}</p>
        <button onClick={handleJumpScare} className='scare-button'>
          ¡No presiones este botón!
        </button>

        <button className='main-icon' onClick={handleDownSection}>
          <GiLongLeggedSpider />
        </button>
      </div>

      {showJumpScare && <JumpScare />}
    </>
  )
}
