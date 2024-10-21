import { Helmet } from 'react-helmet-async'
import '../assets/css/Loading.css'

export default function Loading() {
  return (
    <>
      <Helmet>
        <title>Cargando... | Halloween Target Card</title>
      </Helmet>

      <div className='loading'>
        <div className='loader'></div>
      </div>
    </>
  )
}
