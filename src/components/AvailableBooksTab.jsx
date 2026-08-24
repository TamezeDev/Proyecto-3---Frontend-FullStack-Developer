import { useCallback } from 'react'
import { SimpleGrid, Text, Flex, Box } from '@chakra-ui/react'
import { useInfiniteList } from '../hooks/useInfiniteList'
import BookAdminCard from '../components/BookAdminCard'

const API_URL = import.meta.env.VITE_API_URL
const LIMIT = 15

const AvailableBooksTab = ({ token, onBookDisabled }) => {
  const fetchBooksPage = useCallback(
    async (page) => {
      const res = await fetch(`${API_URL}/books?page=${page}&limit=${LIMIT}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()
      if (!res.ok)
        throw new Error(result.error || 'Error al cargar el catálogo')
      return { data: result.data, pagination: result.pagination }
    },
    [token]
  )

  const {
    items: books,
    loading,
    error,
    hasMore,
    setSentinel,
    removeItem,
  } = useInfiniteList(fetchBooksPage)

  function handleToggled(bookId) {
    removeItem(bookId)
    onBookDisabled?.()
  }

  return (
    <Flex flexDirection="column" gap={4} mt={4}>
      {error && (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
        {books.map((book) => (
          <BookAdminCard
            key={book._id}
            book={book}
            token={token}
            mode="available"
            onToggled={handleToggled}
          />
        ))}
      </SimpleGrid>

      {hasMore && <Box ref={setSentinel} h="20px" />}

      {loading && (
        <Text textStyle="muted" textAlign="center">
          Cargando libros...
        </Text>
      )}

      {!hasMore && books.length > 0 && (
        <Text textStyle="muted" textAlign="center">
          Ya has visto todo el catálogo disponible.
        </Text>
      )}
    </Flex>
  )
}

export default AvailableBooksTab
