import { useState } from 'react'
import { Box, Text, Heading, Button, Badge, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import BookCover from './BookCover'

const API_URL = import.meta.env.VITE_API_URL

const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

const LibraryBookCard = ({ item, user, token, updateUser, onRemoved }) => {
  const navigate = useNavigate()
  const book = item.book
  const [loadingRemove, setLoadingRemove] = useState(false)
  const [loadingRead, setLoadingRead] = useState(false)
  const [error, setError] = useState('')

  const isReading = user?.reading?.some(
    (r) => r.book === book._id || r.book?._id === book._id
  )

  async function handleRemove() {
    const confirmed = window.confirm(
      `¿Quitar "${book.bookName}" de tu biblioteca? ` +
        (isReading ? 'También se eliminará de tu lectura actual.' : '')
    )
    if (!confirmed) return

    setError('')
    setLoadingRemove(true)
    try {
      const res = await fetch(`${API_URL}/users/library/${book._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Error al eliminar el libro')

      updateUser({
        library: user.library.filter(
          (i) => i.book !== book._id && i.book?._id !== book._id
        ),
        reading: user.reading.filter(
          (r) => r.book !== book._id && r.book?._id !== book._id
        ),
      })
      onRemoved(item._id)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingRemove(false)
    }
  }

  async function handleStartReading() {
    setError('')
    setLoadingRead(true)
    try {
      const res = await fetch(`${API_URL}/users/reading/${book._id}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()
      if (!res.ok)
        throw new Error(result.error || 'Error al empezar a leer el libro')

      updateUser({ reading: result.data })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingRead(false)
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

      <Heading textStyle="title" as="h3" fontSize="md">
        {book.bookName}
      </Heading>
      <Text textStyle="muted" fontSize="sm">
        {book.author} · {book.pages} páginas
      </Text>
      {book.genre?.name && (
        <Badge colorPalette="purple">{book.genre.name}</Badge>
      )}

      <Text textStyle="muted" fontSize="sm">
        Añadido el {formatDate(item.dateAdded)}
      </Text>

      {error && (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      )}

      <Flex gap={2} mt="auto">
        <Button
          variant="outline"
          colorPalette="red"
          flex={1}
          loading={loadingRemove}
          onClick={handleRemove}
        >
          Quitar
        </Button>

        {isReading ? (
          <Button
            flex={1}
            layerStyle="headerBtn"
            onClick={() => navigate('/reading')}
          >
            Continuar leyendo
          </Button>
        ) : (
          <Button
            flex={1}
            layerStyle="headerBtn"
            loading={loadingRead}
            onClick={handleStartReading}
          >
            Empezar a leer
          </Button>
        )}
      </Flex>
    </Box>
  )
}

export default LibraryBookCard
