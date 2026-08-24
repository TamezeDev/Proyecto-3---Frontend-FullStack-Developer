import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Flex, Heading, Text, Button, Progress } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'

const API_URL = import.meta.env.VITE_API_URL

const ReadingSession = () => {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()

  const [book, setBook] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const saveRequestId = useRef(0)

  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await fetch(`${API_URL}/users/reading/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const result = await res.json()
        if (!res.ok) throw new Error(result.error || 'Error al cargar el libro')

        setBook(result.data.book)

        const totalChunks = result.data.book.content?.length || 1
        setCurrentPage(Math.min(result.data.currentPage || 1, totalChunks))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadProgress()
  }, [bookId, token])

  async function savePage(newPage) {
    const requestId = ++saveRequestId.current
    setSaving(true)
    try {
      const res = await fetch(`${API_URL}/users/reading/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPage: newPage }),
      })
      const result = await res.json()
      if (!res.ok)
        throw new Error(result.error || 'Error al guardar el progreso')
    } catch (err) {
      if (requestId === saveRequestId.current) {
        setError(err.message)
      }
    } finally {
      if (requestId === saveRequestId.current) setSaving(false)
    }
  }

  function handleChangePage(delta) {
    const totalChunks = book.content?.length || 1
    const newPage = currentPage + delta
    if (newPage < 1 || newPage > totalChunks) return

    setError('')
    setCurrentPage(newPage)
    savePage(newPage)
  }

  if (loading) {
    return (
      <Text textStyle="muted" textAlign="center" p={8}>
        Cargando libro...
      </Text>
    )
  }

  if (error && !book) {
    return (
      <Text color="red.500" textAlign="center" p={8}>
        {error}
      </Text>
    )
  }

  const totalChunks = book.content?.length || 1
  const isEnd = currentPage >= totalChunks
  const pageText = book.content[currentPage - 1]

  return (
    <Flex
      flexDirection="column"
      gap={4}
      p={{ base: 4, md: 8 }}
      maxWidth="700px"
      margin="0 auto"
    >
      <Button
        layerStyle="headerBtn"
        width={'auto'}
        variant="outline"
        alignSelf="flex-start"
        onClick={() => navigate('/reading')}
      >
        ← Volver a mi lectura
      </Button>

      <Heading textStyle="sectionTitle" as="h1" fontSize="xl">
        {book.bookName}
      </Heading>

      <Progress.Root value={(currentPage / totalChunks) * 100} size="sm">
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>

      <Box layerStyle="globalCard" p={6} minHeight="300px">
        {isEnd ? (
          <Flex
            flexDirection="column"
            alignItems="center"
            gap={2}
            textAlign="center"
            py={8}
          >
            <Heading textStyle="title" as="h2" fontSize="lg">
              Fin del contenido de muestra
            </Heading>
            <Text textStyle="muted">
              Has llegado al final del extracto disponible de este libro en la
              plataforma.
            </Text>
          </Flex>
        ) : (
          <Text textStyle="body" whiteSpace="pre-line">
            {pageText}
          </Text>
        )}
      </Box>

      {error && (
        <Text color="red.500" fontSize="sm" textAlign="center">
          {error}
        </Text>
      )}

      <Flex
        wrap={'wrap'}
        gap={6}
        justifyContent={{ base: 'center', sm: 'space-between' }}
        alignItems="center"
      >
        <Button
          onClick={() => handleChangePage(-1)}
          disabled={currentPage <= 1 || saving}
        >
          ← Página anterior
        </Button>

        <Text
          textStyle="muted"
          fontSize="sm"
          minW={'100px'}
          order={{ base: 1, sm: 0 }}
        >
          {isEnd ? 'Terminado' : `Página ${currentPage} de ${totalChunks}`}
        </Text>

        <Button
          onClick={() => handleChangePage(1)}
          disabled={isEnd || saving}
          layerStyle="headerBtn"
          width={'auto'}
        >
          Página siguiente →
        </Button>
      </Flex>
    </Flex>
  )
}

export default ReadingSession
