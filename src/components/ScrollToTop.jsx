import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { path } = useLocation()

  useEffect(() => {}, [path])
  window.scrollTo(0, 0)
  return null
}
export default ScrollToTop
