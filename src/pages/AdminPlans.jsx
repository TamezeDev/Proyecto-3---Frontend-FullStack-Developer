import { useState, useEffect } from 'react'
import { SimpleGrid, Heading, Text, Flex } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import PlanAdminCard from '../components/PlanAdminCard'
import NewPlanForm from '../components/NewPlanForm'

const API_URL = import.meta.env.VITE_API_URL

const AdminPlans = () => {
  const { token } = useAuth()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPlans() {
      try {
        const res = await fetch(`${API_URL}/plans`)
        const result = await res.json()
        if (!res.ok)
          throw new Error(result.error || 'Error al cargar los planes')
        setPlans(result.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadPlans()
  }, [])

  function handleCreated(newPlan) {
    setPlans((prev) => [...prev, newPlan])
  }

  function handleUpdated(updatedPlan) {
    setPlans((prev) =>
      prev.map((p) => (p._id === updatedPlan._id ? updatedPlan : p))
    )
  }

  function handleDeleted(deletedId) {
    setPlans((prev) => prev.filter((p) => p._id !== deletedId))
  }

  return (
    <Flex
      flexDirection="column"
      gap={6}
      p={{ base: 4, md: 8 }}
      maxWidth="1000px"
      margin="0 auto"
    >
      <Heading textStyle="sectionTitle" as="h1">
        Gestión de planes premium
      </Heading>

      <NewPlanForm token={token} onCreated={handleCreated} />

      {error && (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      )}

      {loading && (
        <Text textStyle="muted" textAlign="center">
          Cargando planes...
        </Text>
      )}

      {!loading && plans.length === 0 && !error && (
        <Text textStyle="muted" textAlign="center">
          No hay ningún plan premium creado todavía.
        </Text>
      )}

      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={4}>
        {plans.map((plan) => (
          <PlanAdminCard
            key={plan._id}
            plan={plan}
            token={token}
            onUpdated={handleUpdated}
            onDeleted={handleDeleted}
          />
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export default AdminPlans
