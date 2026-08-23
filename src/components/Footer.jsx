import { Flex, Text, Box, Icon } from '@chakra-ui/react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'

const mainText = 'El rincón de la tinta'
const secondaryText = '@ Todos los derechos reservados - '

const Footer = () => {
  return (
    <Flex
      layerStyle={'footerCard'}
      as={'footer'}
      flexDirection={{ base: 'column', md: 'row' }}
      justifyContent={'center'}
      alignItems={'center'}
      gap={{ base: 2, md: 4 }}
    >
      <Text textStyle={'footer'}>{mainText}</Text>
      <Text textStyle={'footer'}>
        {secondaryText} {new Date().getFullYear()}
      </Text>
      <Box spaceX={4} textStyle={'footer'}>
        <Icon as={FaFacebook} cursor="pointer"></Icon>
        <Icon as={FaInstagram} cursor="pointer"></Icon>
        <Icon as={FaTwitter} cursor="pointer"></Icon>
      </Box>
    </Flex>
  )
}

export default Footer
