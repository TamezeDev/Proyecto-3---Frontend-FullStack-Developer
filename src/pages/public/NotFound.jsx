import { Flex, Heading, Text, Button } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { paths } from '../../routing/paths'

const NotFound = () => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={4}
      textAlign="center"
      minHeight="60vh"
      p={8}
    >
      <Heading textStyle="sectionTitle" as="h1" fontSize="6xl">
        404
      </Heading>
      <Heading textStyle="title" as="h2" fontSize="xl">
        Página no encontrada
      </Heading>
      <Text textStyle="muted" maxWidth="400px">
        La página que buscas no existe.
      </Text>

      <Button asChild layerStyle="headerBtn" mt={4}>
        <NavLink to={paths.home}>Volver al inicio</NavLink>
      </Button>
    </Flex>
  )
}

export default NotFound
