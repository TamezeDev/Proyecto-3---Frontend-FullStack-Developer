import { Routes, Route } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Library from '../pages/Library'
import Reading from '../pages/Reading'
import About from '../pages/About'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/library" element={<Library />} />
      <Route path="/reading" element={<Reading />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default Routing
