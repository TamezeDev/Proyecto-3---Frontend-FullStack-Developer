import { Flex, Link as ChakraLink } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const NavItem = ({ option }) => {
  return (
    <Flex as={'li'}>
      <ChakraLink
        as={'a'}
        layerStyle={'navItem'}
        asChild
        _currentPage={{ color: 'amber.high', fontWeight: 'bold' }}
      >
        <NavLink to={option.path}>{option.name}</NavLink>
      </ChakraLink>
    </Flex>
  )
}

export default NavItem
