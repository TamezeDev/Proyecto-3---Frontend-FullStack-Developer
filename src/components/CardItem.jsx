import { useState } from 'react'
import { Box, Flex, Input, Button, Text } from '@chakra-ui/react'

const API_URL = import.meta.env.VITE_API_URL

const CardItem = ({ card, token, onRemoved, onCreditUpdated }) => {
  const [showRecharge, setShowRecharge] = useState(false)
  const [quantity, setQuantity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const maskedNumber = `•••• •••• •••• ${card.numberCard.slice(-4)}`

  async function handleRemove() {
    setError('')
    try {
      const res = await fetch(`${API_URL}/users/card/${card._id}`, {
        method: 'DELETE',

        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      })
      const result = await res.json()
      if (!res.ok)
        throw new Error(result.error || 'Error al eliminar la tarjeta')
      onRemoved(card._id)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleRecharge() {
    setError('')
    const parsedQuantity = Number(quantity)
    if (!quantity || parsedQuantity <= 0) {
      setError('Introduce una cantidad válida')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/cards/addCredit/${card._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: parsedQuantity }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Error al recargar saldo')

      onCreditUpdated(card._id, result.data.credit)
      setQuantity('')
      setShowRecharge(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box layerStyle="globalCard">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        wrap="wrap"
        gap={2}
      >
        <Box>
          <Text textStyle="body" fontWeight="bold">
            {maskedNumber}
          </Text>
          <Text textStyle="muted">Titular: {card.nameOwner}</Text>
          <Text textStyle="muted">Caduca: {card.expiredDate}</Text>
          <Text textStyle="body" color="amber.high" fontWeight="bold">
            Saldo: {card.credit.toFixed(2)} €
          </Text>
        </Box>

        <Flex gap={2}>
          <Button
            size="sm"
            layerStyle="headerBtn"
            onClick={() => setShowRecharge(!showRecharge)}
          >
            Recargar
          </Button>
          <Button
            size="sm"
            colorPalette="red"
            variant="outline"
            onClick={handleRemove}
          >
            Eliminar
          </Button>
        </Flex>
      </Flex>

      {showRecharge && (
        <Flex mt={4} gap={2} alignItems="center">
          <Input
            type="number"
            placeholder="Cantidad en €"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            maxWidth="150px"
          />
          <Button
            size="sm"
            layerStyle="headerBtn"
            loading={loading}
            onClick={handleRecharge}
          >
            Confirmar
          </Button>
        </Flex>
      )}

      {error && (
        <Text color="red.500" fontSize="sm" mt={2}>
          {error}
        </Text>
      )}
    </Box>
  )
}

export default CardItem
