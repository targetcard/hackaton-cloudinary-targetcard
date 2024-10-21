import './assets/css/App.css'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loading from './Pages/Loading'

const Index = lazy(() => import('./Pages/Index'))
const Gallery = lazy(() => import('./Pages/Gallery'))

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/gallery' element={<Gallery />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
