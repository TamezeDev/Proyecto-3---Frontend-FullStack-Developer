import { useState } from 'react'
import { Box, Text, Heading, Button, Badge } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import BookCover from './BookCover'

const API_URL = import.meta.env.VITE_API_URL

const CatalogBookCard = ({
  book,
  user,
  token,
  isAuthenticated,
  isPremium,
  updateUser,
}) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isInLibrary = user?.library?.some(
    (item) => item.book === book._id || item.book?._id === book._id
  )

  async function handleAddToLibrary() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/users/library/${book._id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Error al añadir el libro')

      updateUser({ library: result.data })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  function renderAction() {
    if (!isAuthenticated) {
      return (
        <Button mt="auto" minW={'full'} onClick={() => navigate('/register')}>
          Regístrate para leer
        </Button>
      )
    }

    if (!isPremium) {
      return (
        <Button
          mt="auto"
          minW={'full'}
          colorPalette="amber"
          onClick={() => navigate('/premium')}
        >
          Hazte premium para leer
        </Button>
      )
    }

    if (isInLibrary) {
      return (
        <Button mt="auto" minW={'full'} variant="outline" disabled>
          Ya está en tu biblioteca
        </Button>
      )
    }

    return (
      <Button
        mt="auto"
        minW={'full'}
        layerStyle="headerBtn"
        loading={loading}
        onClick={handleAddToLibrary}
      >
        Añadir a mi biblioteca
      </Button>
    )
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

      <Heading textStyle="title" as="h3" fontSize="md">
        {book.bookName}
      </Heading>
      <Text textStyle="muted" fontSize="sm">
        {book.author} · {book.pages} páginas
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

      {renderAction()}
    </Box>
  )
}

export default CatalogBookCard
