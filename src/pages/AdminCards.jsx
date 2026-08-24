import { useCallback, useState } from 'react'
import { SimpleGrid, Heading, Text, Flex, Box, Button } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import { useInfiniteList } from '../hooks/useInfiniteList'
import CardAdminItem from '../components/CardAdminItem'

const API_URL = import.meta.env.VITE_API_URL
const LIMIT = 12

const AdminCards = () => {
  const { user, token, updateUser } = useAuth()
  const [selectedId, setSelectedId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const fetchCardsPage = useCallback(
    async (page) => {
      const res = await fetch(`${API_URL}/cards?page=${page}&limit=${LIMIT}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()
      if (!res.ok)
        throw new Error(result.error || 'Error al cargar las tarjetas')

      return { data: result.data, pagination: result.pagination }
    },
    [token]
  )

  const {
    items: cards,
    loading,
    error,
    hasMore,
    setSentinel,
    removeItem,
  } = useInfiniteList(fetchCardsPage)

  const selectedCard = cards.find((c) => c._id === selectedId)

  function handleSelect(id) {
    setDeleteError('')
    setSelectedId((prev) => (prev === id ? null : id))
  }

  async function handleDelete() {
    if (!selectedCard) return

    const confirmed = window.confirm(
      `¿Eliminar definitivamente la tarjeta ${selectedCard.numberCard} (${selectedCard.nameOwner})? ` +
        'Se borrará del servidor y se desvinculará de todos los usuarios que la tengan asociada.'
    )
    if (!confirmed) return

    setDeleting(true)
    setDeleteError('')

    const cardIdToDelete = selectedCard._id

    try {
      const res = await fetch(`${API_URL}/cards/${cardIdToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()
      if (!res.ok)
        throw new Error(result.error || 'Error al eliminar la tarjeta')

      removeItem(cardIdToDelete)
      setSelectedId(null)

      const wasOwnCard = user.cardPayments?.some(
        (c) => c._id === cardIdToDelete
      )
      if (wasOwnCard) {
        updateUser({
          cardPayments: user.cardPayments.filter(
            (c) => c._id !== cardIdToDelete
          ),
        })
      }
    } catch (err) {
      setDeleteError(err.message)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Flex flexDirection="column" gap={6} p={{ base: 4, md: 8 }}>
      <Heading textStyle="sectionTitle" as="h1">
        Gestión de tarjetas
      </Heading>

      <Text textStyle="muted" textAlign={'center'}>
        Selecciona una tarjeta para eliminarla del servidor por completo (ej.
        fraude). Se desvinculará automáticamente de cualquier usuario que la
        tenga guardada.
      </Text>

      {error && (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      )}

      {selectedCard && (
        <Flex
          layerStyle="globalCard"
          p={4}
          alignItems="center"
          justifyContent="space-between"
          gap={4}
          bg="red.50"
        >
          <Text textStyle="body">
            Seleccionada: {selectedCard.numberCard} — {selectedCard.nameOwner}
          </Text>
          <Button colorPalette="red" loading={deleting} onClick={handleDelete}>
            Eliminar tarjeta
          </Button>
        </Flex>
      )}

      {deleteError && (
        <Text color="red.500" textAlign="center">
          {deleteError}
        </Text>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={4}>
        {cards.map((card) => (
          <CardAdminItem
            key={card._id}
            card={card}
            selected={card._id === selectedId}
            onSelect={handleSelect}
          />
        ))}
      </SimpleGrid>

      {hasMore && <Box ref={setSentinel} h="20px" />}

      {loading && (
        <Text textStyle="muted" textAlign="center">
          Cargando tarjetas...
        </Text>
      )}

      {!hasMore && cards.length > 0 && (
        <Text textStyle="muted" textAlign="center">
          Ya se han cargado todas las tarjetas registradas.
        </Text>
      )}
    </Flex>
  )
}

export default AdminCards
