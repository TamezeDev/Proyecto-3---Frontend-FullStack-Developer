import { Flex } from '@chakra-ui/react'
import Brand from './Brand'
import HeaderButton from './HeaderButton'
import NavMenu from './NavMenu'

const Header = () => {
  return (
    <Flex
      as={'header'}
      flexDirection={'column'}
      justifyContent={'center'}
      gap={3}
      marginLeft={{ base: 'sm', sm: 'md' }}
      marginRight={{ base: 'sm', sm: 'md' }}
    >
      <Flex
        as={'section'}
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent={'space-around'}
        gap={3}
        marginTop={{ base: 'sm', sm: 'md' }}
        borderBottom={'1px solid {colors.amber.high}'}
      >
        <Brand />
        <Flex
          as={'section'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          wrap={'wrap'}
          gap={{ base: 6, md: 12 }}
          margin={{ base: 'sm', sm: 'md' }}
          marginBottom={'xl'}
        >
          <HeaderButton name="Regístrate"></HeaderButton>
          <HeaderButton name="Login"></HeaderButton>
        </Flex>
      </Flex>
      <NavMenu />
    </Flex>
  )
}

export default Header
