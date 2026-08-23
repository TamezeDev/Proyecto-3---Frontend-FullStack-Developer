import { useCallback } from 'react'
import { SimpleGrid, Heading, Text, Flex, Box } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import { useInfiniteList } from '../hooks/useInfiniteList'
import UserCard from '../components/UserCard'

const API_URL = import.meta.env.VITE_API_URL
const LIMIT = 12

const AdminUsers = () => {
  const { token } = useAuth()

  const fetchUsersPage = useCallback(
    async (page) => {
      const res = await fetch(`${API_URL}/users?page=${page}&limit=${LIMIT}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      const result = await res.json()
      if (!res.ok)
        throw new Error(result.error || 'Error al cargar los usuarios')
      return result
    },
    [token]
  )

  const {
    items: users,
    loading,
    error,
    hasMore,
    setSentinel,
  } = useInfiniteList(fetchUsersPage)

  return (
    <Flex flexDirection="column" gap={6} p={{ base: 4, md: 8 }}>
      <Heading textStyle="sectionTitle" as="h1">
        Gestión de usuarios
      </Heading>

      {error && (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </SimpleGrid>

      {hasMore && <Box ref={setSentinel} h="20px" />}

      {loading && (
        <Text textStyle="muted" textAlign="center">
          Cargando usuarios...
        </Text>
      )}

      {!hasMore && users.length > 0 && (
        <Text textStyle="muted" textAlign="center">
          Se han cargado todos los usuarios
        </Text>
      )}
    </Flex>
  )
}

export default AdminUsers
