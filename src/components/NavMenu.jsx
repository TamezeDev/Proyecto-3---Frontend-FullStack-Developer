import { Flex } from '@chakra-ui/react'
import NavItem from './NavItem'

const navOptions = [
  { name: 'Inicio', path: '/' },
  { name: 'Catálogo', path: '/catalog' },
  { name: 'Biblioteca', path: '/library' },
  { name: 'Leyendo', path: '/reading' },
  { name: 'Planes premium', path: '/premium' },
  { name: 'Sobre nosotros', path: '/about' },
]

const NavMenu = () => {
  return (
    <Flex
      as={'nav'}
      justify={'center'}
      align={'center'}
      margin={{ base: 'sm' }}
      paddingBottom={{ base: 'md', sm: 'none' }}
      borderBottom={{ base: '1px solid {colors.amber.high}', sm: 'none' }}
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
