import { Flex } from '@chakra-ui/react'
import Brand from './Brand'
import HeaderButton from './HeaderButton'

const Header = () => {
  return (
    <Flex
      as={'header'}
      flexDirection={'column'}
      justifyContent={'center'}
      gap={3}
      margin={{ base: '10px', sm: '20px' }}
    >
      <Flex
        as={'section'}
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent={'space-around'}
        gap={3}
        margin={{ base: '10px', sm: '20px' }}
      >
        <Brand />
        <Flex
          as={'section'}
          flexDirection={'row'}
          justifyContent={'center'}
          wrap={'wrap'}
          gap={{ base: 6, md: 12 }}
          margin={{ base: '10px', sm: '20px' }}
        >
          <HeaderButton name="Regístrate"></HeaderButton>
          <HeaderButton name="Login"></HeaderButton>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Header
