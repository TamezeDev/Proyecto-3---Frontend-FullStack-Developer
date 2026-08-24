import { useState } from 'react'
import { Box, Text, Heading, Button, Flex, Progress } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import BookCover from './BookCover'

const API_URL = import.meta.env.VITE_API_URL

const ReadingProgressCard = ({
  item,
  token,
  updateUser,
  user,
  onStoppedReading,
}) => {
  const navigate = useNavigate()
  const book = item.book
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const totalChunks = book.content?.length || 1
  const finished = item.currentPage >= totalChunks
  const progressPercent = Math.min((item.currentPage / totalChunks) * 100, 100)

  async function handleStopReading() {
    const confirmed = window.confirm(
      `¿Dejar de leer "${book.bookName}"? Perderás tu progreso guardado.`
    )
    if (!confirmed) return

    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/users/reading/${book._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()
      if (!res.ok)
        throw new Error(result.error || 'Error al dejar de leer el libro')

      updateUser({
        reading: user.reading.filter(
          (r) => r.book !== book._id && r.book?._id !== book._id
        ),
      })
      onStoppedReading(item._id)
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

      <Heading textStyle="title" as="h3" fontSize="md">
        {book.bookName}
      </Heading>
      <Text textStyle="muted" fontSize="sm">
        {book.author}
      </Text>

      <Progress.Root
        value={progressPercent}
        size="sm"
        colorPalette={finished ? 'green' : 'amber'}
      >
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>

      <Text textStyle="muted" fontSize="sm">
        {finished
          ? 'Contenido de muestra terminado'
          : `Página ${item.currentPage} de ${totalChunks} (muestra)`}
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
          loading={loading}
          onClick={handleStopReading}
        >
          Dejar de leer
        </Button>
        <Button
          flex={1}
          layerStyle="headerBtn"
          onClick={() => navigate(`/reading/${book._id}`)}
        >
          {finished ? 'Ver de nuevo' : 'Continuar'}
        </Button>
      </Flex>
    </Box>
  )
}

export default ReadingProgressCard
