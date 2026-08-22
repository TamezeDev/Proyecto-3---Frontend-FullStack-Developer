import { Flex, Heading, Text, Image } from '@chakra-ui/react'
import logoBrand from '../assets/logoBrand.png'
const brandName = 'El rincón de la tinta'
const altMessage = 'Arbol con montones de libros'
const brandInfo = 'Dale vida a tu imaginación'

const Brand = () => {
  return (
    <Flex
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      p={{ base: 4, md: 6 }}
      gap={3}
    >
      <Image layerStyle="circleImage" src={logoBrand} alt={altMessage}></Image>
      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        gap={4}
      >
        <Heading textStyle={'sectionTitle'}> {brandName}</Heading>
        <Text textStyle={'subSectionTitle'}>{brandInfo}</Text>
      </Flex>
    </Flex>
  )
}

export default Brand
