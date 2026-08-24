import { useState } from 'react'
import { Box, Text, Heading, Button, Badge } from '@chakra-ui/react'
import BookCover from './BookCover'

const API_URL = import.meta.env.VITE_API_URL

const BookAdminCard = ({ book, token, mode, onToggled }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isAvailableView = mode === 'available'
  const endpoint = isAvailableView
    ? `${API_URL}/books/disable/${book._id}`
    : `${API_URL}/books/enable/${book._id}`

  async function handleToggle() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch(endpoint, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()
      if (!res.ok)
        throw new Error(result.error || 'Error al actualizar el libro')

      onToggled(book._id, result.data)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <Box
      layerStyle="globalCard"
      p={4}
      display="flex"
      flexDirection="column"
      gap={2}
      h="100%"
    >
      <BookCover isbn={book.isbn} alt={book.bookName} />

      <Heading textStyle="title" as="h3" fontSize="md" mb={0}>
        {book.bookName}
      </Heading>
      <Text textStyle="muted" fontSize="sm">
        {book.author} · {book.pages} páginas
      </Text>
      <Text textStyle="muted" fontSize="sm">
        ISBN: {book.isbn}
      </Text>

      {book.genre?.name && (
        <Badge colorPalette="purple">{book.genre.name}</Badge>
      )}

      <Text textStyle="body" fontSize="sm" lineClamp={3}>
        {book.synopsis}
      </Text>

      {error && (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      )}

      <Button
        mt="auto"
        w="full"
        colorPalette={isAvailableView ? 'red' : 'green'}
        loading={loading}
        onClick={handleToggle}
      >
        {isAvailableView ? 'Desactivar del catálogo' : 'Activar en el catálogo'}
      </Button>
    </Box>
  )
}

export default BookAdminCard
