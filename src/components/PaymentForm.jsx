import { useState } from 'react'
import { Box, Flex, Heading, Text, Button, Field } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL

const PaymentForm = ({ plan, user, token, updateUser, onCancel }) => {
  const [selectedCardId, setSelectedCardId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const cards = user?.cardPayments || []
  const selectedCard = cards.find((c) => c._id === selectedCardId)

  async function handleConfirm() {
    setError('')

    if (!selectedCardId) {
      setError('Selecciona una tarjeta para pagar')
      return
    }
    if (selectedCard && selectedCard.credit < plan.price) {
      setError('La tarjeta seleccionada no tiene saldo suficiente')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/premium/setPremium`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: plan.name, cardId: selectedCardId }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Error al procesar el pago')

      const updatedCards = cards.map((c) =>
        c._id === selectedCardId ? { ...c, credit: c.credit - plan.price } : c
      )

      updateUser({
        cardPayments: updatedCards,
        premiumAccount: result.data,
      })

      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Box layerStyle="globalCard" textAlign="center">
        <Heading textStyle="title" as="h2" mb={2}>
          ¡Plan activado con éxito!
        </Heading>
        <Text textStyle="body">
          Ya tienes acceso completo a tu biblioteca y a la lectura de tus
          libros.
        </Text>
      </Box>
    )
  }

  return (
    <Box layerStyle="globalCard">
      <Heading textStyle="title" as="h2" mb={4}>
        Pagar {plan.name} — {plan.price.toFixed(2)} €
      </Heading>

      {cards.length === 0 && (
        <Text textStyle="muted" textAlign="center">
          No tienes ninguna tarjeta añadida. Añade una desde{' '}
          <NavLink to="/tarjetas" style={{ fontWeight: 'bold' }}>
            Mis tarjetas
          </NavLink>{' '}
          antes de continuar.
        </Text>
      )}

      {cards.length > 0 && (
        <Field.Root>
          <Field.Label>Selecciona la tarjeta de pago</Field.Label>
          <Flex flexDirection="column" gap={2}>
            {cards.map((card) => (
              <Flex
                key={card._id}
                as="label"
                layerStyle="globalCard"
                p={3}
                cursor="pointer"
                alignItems="center"
                gap={3}
                border={
                  selectedCardId === card._id
                    ? '2px solid {colors.amber.high}'
                    : undefined
                }
              >
                <input
                  type="radio"
                  name="card"
                  value={card._id}
                  checked={selectedCardId === card._id}
                  onChange={() => setSelectedCardId(card._id)}
                />
                <Text textStyle="body">
                  •••• {card.numberCard.slice(-4)} — Saldo:{' '}
                  {card.credit.toFixed(2)} €
                </Text>
              </Flex>
            ))}
          </Flex>
        </Field.Root>
      )}

      {error && (
        <Text color="red.500" fontSize="sm" mt={3} textAlign="center">
          {error}
        </Text>
      )}

      <Flex gap={3} mt={4}>
        <Button variant="outline" onClick={onCancel} flex={1}>
          Cancelar
        </Button>
        <Button
          layerStyle="headerBtn"
          loading={loading}
          onClick={handleConfirm}
          flex={1}
          disabled={cards.length === 0}
        >
          Confirmar pago
        </Button>
      </Flex>
    </Box>
  )
}

export default PaymentForm
