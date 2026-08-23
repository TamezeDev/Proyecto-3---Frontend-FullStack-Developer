import { useState } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import CardItem from '../components/CardItem'
import AddCardForm from '../components/AddCardForm'

const Cards = () => {
  const { user, token, updateUser } = useAuth()
  const [cards, setCards] = useState(user?.cardPayments || [])

  function syncContext(newCards) {
    setCards(newCards)
    updateUser({ cardPayments: newCards })
  }

  function handleCardAdded(newCard) {
    syncContext([...cards, newCard])
  }

  function handleCardRemoved(cardId) {
    syncContext(cards.filter((c) => c._id !== cardId))
  }

  function handleCreditUpdated(cardId, newCredit) {
    syncContext(
      cards.map((c) => (c._id === cardId ? { ...c, credit: newCredit } : c))
    )
  }

  return (
    <Flex
      flexDirection="column"
      gap={8}
      p={{ base: 4, md: 8 }}
      maxWidth="700px"
      margin="0 auto"
    >
      <Heading textStyle="sectionTitle" as="h1">
        Mis tarjetas
      </Heading>

      {cards.length === 0 && (
        <Text textStyle="muted" textAlign="center">
          Todavía no tienes ninguna tarjeta asociada.
        </Text>
      )}

      <Flex flexDirection="column" gap={4}>
        {cards.map((card) => (
          <CardItem
            key={card._id}
            card={card}
            token={token}
            onRemoved={handleCardRemoved}
            onCreditUpdated={handleCreditUpdated}
          />
        ))}
      </Flex>

      <AddCardForm token={token} onCardAdded={handleCardAdded} />
    </Flex>
  )
}

export default Cards
