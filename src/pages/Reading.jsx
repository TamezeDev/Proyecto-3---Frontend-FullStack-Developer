import { useState, useEffect } from 'react'
import { SimpleGrid, Heading, Text, Flex, Box } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ReadingProgressCard from '../components/ReadingProgressCard'
import { useScrollIntoView } from '../hooks/useScrollIntoView'

const API_URL = import.meta.env.VITE_API_URL

const Reading = () => {
  const formRef = useScrollIntoView()
  const { user, token, updateUser } = useAuth()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadReading() {
      try {
        if (!token) return
        const res = await fetch(`${API_URL}/users/reading`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const result = await res.json()
        if (!res.ok)
          throw new Error(result.error || 'Error al cargar tu lectura actual')
        setItems(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadReading()
  }, [token])

  function handleStoppedReading(itemId) {
    setItems((prev) => prev.filter((i) => i._id !== itemId))
  }

  return (
    <Flex flexDirection="column" gap={6} p={{ base: 4, md: 8 }}>
      <Heading ref={formRef} textStyle="sectionTitle" as="h1">
        Continuar leyendo
      </Heading>
      {loading && (
        <Text textStyle="muted" textAlign="center">
          Cargando tu lectura actual...
        </Text>
      )}
      {error && (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      )}
      {!token && (
        <Box textAlign="center">
          <Text textStyle="muted" mb={3}>
            Area reservada para usuarios premium
          </Text>
          <NavLink to="/register" style={{ fontWeight: 'bold' }}>
            Comienza ahora mismo
          </NavLink>
        </Box>
      )}
      {token && !loading && !error && items.length === 0 && (
        <Box textAlign="center">
          <Text textStyle="muted" mb={3}>
            No estás leyendo ningún libro ahora mismo.
          </Text>
          <NavLink to="/library" style={{ fontWeight: 'bold' }}>
            Ir a mi biblioteca
          </NavLink>
        </Box>
      )}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
        {items.map((item) => (
          <ReadingProgressCard
            key={item._id}
            item={item}
            user={user}
            token={token}
            updateUser={updateUser}
            onStoppedReading={handleStoppedReading}
          />
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export default Reading
