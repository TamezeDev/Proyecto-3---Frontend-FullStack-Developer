import { Button } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const selecttionPath = (name) => {
  return name === 'Regístrate' ? '/register' : '/login'
}

const HeaderButton = ({ name }) => {
  return (
    <NavLink to={selecttionPath(name)}>
      <Button layerStyle={'headerBtn'}>{name}</Button>
    </NavLink>
  )
}

export default HeaderButton
