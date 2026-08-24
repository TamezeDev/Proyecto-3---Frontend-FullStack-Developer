import { useState, useEffect } from 'react'
import { SimpleGrid, Heading, Text, Flex, Box } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LibraryBookCard from '../components/LibraryBookCard'

const API_URL = import.meta.env.VITE_API_URL

const Library = () => {
  const { user, token, updateUser } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadLibrary() {
      try {
        const res = await fetch(`${API_URL}/users/library`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const result = await res.json()
        if (!res.ok)
          throw new Error(result.error || 'Error al cargar tu biblioteca')
        setItems(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadLibrary()
  }, [token])

  function handleRemoved(itemId) {
    setItems((prev) => prev.filter((i) => i._id !== itemId))
  }

  return (
    <Flex flexDirection="column" gap={6} p={{ base: 4, md: 8 }}>
      <Heading textStyle="sectionTitle" as="h1">
        Mi biblioteca
      </Heading>

      {loading && (
        <Text textStyle="muted" textAlign="center">
          Cargando tu biblioteca...
        </Text>
      )}

      {error && (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      )}

      {!loading && !error && items.length === 0 && (
        <Box textAlign="center">
          <Text textStyle="muted" mb={3}>
            Todavía no tienes ningún libro en tu biblioteca.
          </Text>
          <NavLink to="/catalog" style={{ fontWeight: 'bold' }}>
            Explorar el catálogo
          </NavLink>
        </Box>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
        {items.map((item) => (
          <LibraryBookCard
            key={item._id}
            item={item}
            user={user}
            token={token}
            updateUser={updateUser}
            onRemoved={handleRemoved}
          />
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export default Library
