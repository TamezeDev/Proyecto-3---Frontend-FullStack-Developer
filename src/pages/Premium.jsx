import { useState, useEffect } from 'react'
import { Box, Flex, Heading, Text, Button, SimpleGrid } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import PaymentForm from '../components/PaymentForm'

const API_URL = import.meta.env.VITE_API_URL

const Premium = () => {
  const { user, token, isAuthenticated, updateUser } = useAuth()
  const [plans, setPlans] = useState([])
  const [loadingPlans, setLoadingPlans] = useState(true)
  const [plansError, setPlansError] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)

  useEffect(() => {
    async function loadPlans() {
      try {
        const res = await fetch(`${API_URL}/plans`)
        const result = await res.json()
        if (!res.ok)
          throw new Error(result.error || 'Error al cargar los planes')
        setPlans(result.data)
      } catch (err) {
        setPlansError(err.message)
      } finally {
        setLoadingPlans(false)
      }
    }
    loadPlans()
  }, [])

  if (loadingPlans) {
    return (
      <Text textStyle="body" textAlign="center" p={8}>
        Cargando planes...
      </Text>
    )
  }

  return (
    <Flex
      flexDirection="column"
      gap={8}
      p={{ base: 4, md: 8 }}
      maxWidth="900px"
      margin="0 auto"
    >
      <Box textAlign="center">
        <Heading textStyle="sectionTitle" as="h1">
          Planes premium
        </Heading>
        <Text textStyle="body" mt={2}>
          Desbloquea tu biblioteca personal y la lectura completa de cualquier
          libro.
        </Text>
      </Box>

      {plansError && (
        <Text color="red.500" textAlign="center">
          {plansError}
        </Text>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={4}>
        {plans.map((plan) => (
          <Box
            key={plan._id}
            layerStyle="globalCard"
            textAlign="center"
            border={
              selectedPlan?._id === plan._id
                ? '2px solid {colors.amber.high}'
                : undefined
            }
            cursor={isAuthenticated ? 'pointer' : 'default'}
            onClick={() => isAuthenticated && setSelectedPlan(plan)}
          >
            <Heading textStyle="title" as="h3" fontSize="lg" mb={2}>
              {plan.name}
            </Heading>
            <Text
              textStyle="body"
              fontSize="2xl"
              fontWeight="bold"
              color="amber.high"
            >
              {plan.price.toFixed(2)} €
            </Text>
            <Text textStyle="muted">
              {plan.durationMonths}{' '}
              {plan.durationMonths === 1 ? 'mes' : 'meses'}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {!isAuthenticated && (
        <Box textAlign="center">
          <Text textStyle="body" mb={3}>
            Regístrate o inicia sesión para activar un plan.
          </Text>
          <Button asChild layerStyle="headerBtn">
            <NavLink to="/register">Crear cuenta</NavLink>
          </Button>
        </Box>
      )}

      {isAuthenticated && selectedPlan && (
        <PaymentForm
          plan={selectedPlan}
          user={user}
          token={token}
          updateUser={updateUser}
          onCancel={() => setSelectedPlan(null)}
        />
      )}
    </Flex>
  )
}

export default Premium
