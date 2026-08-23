import { Routes, Route } from 'react-router-dom'
import Register from '../pages/Register'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Library from '../pages/Library'
import Reading from '../pages/Reading'
import About from '../pages/About'
import Profile from '../pages/Profile'
import Cards from '../pages/Cards'
import { Premium } from '../pages'

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/tarjetas" element={<Cards />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/library" element={<Library />} />
      <Route path="/reading" element={<Reading />} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}

export default Routing
