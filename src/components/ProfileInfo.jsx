import { Box, Heading, Flex, Text } from '@chakra-ui/react'

const parseBirthdate = (user) => {
  return user?.birthDate.split('T')[0].split('-')
}

const ProfileInfo = ({ user }) => {
  const [year, month, day] = parseBirthdate(user)
  return (
    <Box layerStyle="globalCard">
      <Heading textStyle="title" as="h2" mb={4}>
        Tus datos
      </Heading>
      <Flex flexDirection="column" gap={2}>
        <Text textStyle="body">
          <Text as="span" fontWeight="bold">
            Nombre:{' '}
          </Text>
          {user?.name} {user?.lastName}
        </Text>
        <Text textStyle="body">
          <Text as="span" fontWeight="bold">
            Email:{' '}
          </Text>
          {user?.email}
        </Text>
        <Text textStyle="body">
          <Text as="span" fontWeight="bold">
            Fecha Nacimiento:{' '}
          </Text>
          {`${day}/${month}/${year}`}
        </Text>
        <Text textStyle="body">
          <Text as="span" fontWeight="bold">
            Rango:{' '}
          </Text>
          {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
        </Text>
      </Flex>
    </Box>
  )
}

export default ProfileInfo
