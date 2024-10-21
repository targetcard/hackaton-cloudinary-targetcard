import '../assets/css/Index.css'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Toaster } from 'sonner'
import { GenerateTarget } from '../components/GenerateTarget'
import { InfoSection } from '../components/InfoSection'
import { Main } from '../components/Main'
import img_scary from '../assets/images/calabaza.png'
import img_scary2 from '../assets/images/fantasmas.png'

export default function Index() {
  return (
    <>
      <Helmet>
        <title>Halloween Target Card</title>
      </Helmet>

      <Toaster position='top-center' duration={2000} richColors />

      <div className='app-container'>
        <Main />

        <div className='bg-section2'>
          <img
            src={img_scary2}
            className='img-scary2'
            alt='Image of the ghost'
          />

          <InfoSection />

          <GenerateTarget />

          <img
            src={img_scary}
            className='img-scary'
            alt='Image of the calabaza'
          />
        </div>
      </div>

      <Link to='/gallery' className='btn-galery in-index'>
        <span>📷</span>Galería
      </Link>
    </>
  )
}
