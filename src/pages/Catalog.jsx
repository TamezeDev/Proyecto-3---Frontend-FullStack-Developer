import { useCallback } from 'react'
import { SimpleGrid, Heading, Text, Flex, Box } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import { useInfiniteList } from '../hooks/useInfiniteList'
import CatalogBookCard from '../components/CatalogBookCard'

const API_URL = import.meta.env.VITE_API_URL
const LIMIT = 15

const Catalog = () => {
  const { user, token, isAuthenticated, isPremium, updateUser } = useAuth()

  const fetchBooksPage = useCallback(async (page) => {
    const res = await fetch(`${API_URL}/books?page=${page}&limit=${LIMIT}`)
    const result = await res.json()
    if (!res.ok) throw new Error(result.error || 'Error al cargar el catálogo')
    return { data: result.data, pagination: result.pagination }
  }, [])

  const {
    items: books,
    loading,
    error,
    hasMore,
    setSentinel,
  } = useInfiniteList(fetchBooksPage)

  return (
    <Flex flexDirection="column" gap={6} p={{ base: 4, md: 8 }}>
      <Box textAlign="center">
        <Heading textStyle="sectionTitle" as="h1">
          Catálogo
        </Heading>
        <Text textStyle="body" mt={2}>
          Explora todos los libros disponibles.
        </Text>
      </Box>

      {error && (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
        {books.map((book) => (
          <CatalogBookCard
            key={book._id}
            book={book}
            user={user}
            token={token}
            isAuthenticated={isAuthenticated}
            isPremium={isPremium}
            updateUser={updateUser}
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
          Has llegado al final del catálogo.
        </Text>
      )}
    </Flex>
  )
}

export default Catalog
