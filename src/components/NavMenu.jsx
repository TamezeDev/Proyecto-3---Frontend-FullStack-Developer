import { Flex } from '@chakra-ui/react'
import NavItem from './NavItem'

const navOptions = [
  { name: 'Inicio', path: '/' },
  { name: 'Catálogo', path: '/catalog' },
  { name: 'Biblioteca', path: '/library' },
  { name: 'Leyendo', path: '/reading' },
  { name: 'Sobre nosotros', path: '/about' },
]

const NavMenu = () => {
  return (
    <Flex
      as={'nav'}
      justify={'center'}
      align={'center'}
      margin={{ base: 'sm' }}
    >
      <Flex as="ul" justifyContent="center" wrap="wrap" gap={8} padding="10px">
        {navOptions.map((option) => (
          <NavItem key={option.path} option={option} />
        ))}
      </Flex>
    </Flex>
  )
}

export default NavMenu
