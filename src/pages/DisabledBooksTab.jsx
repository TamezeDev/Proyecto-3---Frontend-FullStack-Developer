import { useState, useEffect } from 'react'
import { SimpleGrid, Text, Flex } from '@chakra-ui/react'
import BookAdminCard from '../components/BookAdminCard'

const API_URL = import.meta.env.VITE_API_URL

const DisabledBooksTab = ({ token, onBookEnabled }) => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadDisabled() {
      try {
        const res = await fetch(`${API_URL}/books/disabled`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const result = await res.json()
        if (!res.ok)
          throw new Error(
            result.error || 'Error al cargar los libros desactivados'
          )
        setBooks(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadDisabled()
  }, [token])

  function handleToggled(bookId) {
    setBooks((prev) => prev.filter((b) => b._id !== bookId))
    onBookEnabled?.()
  }

  if (loading) {
    return (
      <Text textStyle="muted" textAlign="center" mt={4}>
        Cargando libros desactivados...
      </Text>
    )
  }

  return (
    <Flex flexDirection="column" gap={4} mt={4}>
      {error && (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      )}

      {!error && books.length === 0 && (
        <Text textStyle="muted" textAlign="center">
          No hay ningún libro desactivado.
        </Text>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
        {books.map((book) => (
          <BookAdminCard
            key={book._id}
            book={book}
            token={token}
            mode="disabled"
            onToggled={handleToggled}
          />
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export default DisabledBooksTab
