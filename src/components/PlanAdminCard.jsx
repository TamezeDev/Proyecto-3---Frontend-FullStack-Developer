import { useState } from 'react'
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  Field,
} from '@chakra-ui/react'

const PlanAdminCard = ({ plan, token, onUpdated, onDeleted }) => {
  const API_URL = import.meta.env.VITE_API_URL
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: plan.name,
    price: plan.price,
    durationMonths: plan.durationMonths,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSave() {
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/plans/modify/${plan._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          durationMonths: Number(form.durationMonths),
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Error al modificar el plan')

      onUpdated(result.data)
      setEditing(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      `¿Eliminar el plan "${plan.name}"? Esto no afecta a las cuentas premium ya contratadas con este plan.`
    )
    if (!confirmed) return

    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/plans/${plan._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Error al eliminar el plan')

      onDeleted(plan._id)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  if (editing) {
    return (
      <Box layerStyle="globalCard" p={4}>
        <Field.Root mb={2}>
          <Field.Label>Nombre</Field.Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </Field.Root>
        <Field.Root mb={2}>
          <Field.Label>Precio (€)</Field.Label>
          <Input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
          />
        </Field.Root>
        <Field.Root mb={3}>
          <Field.Label>Duración (meses)</Field.Label>
          <Input
            name="durationMonths"
            type="number"
            value={form.durationMonths}
            onChange={handleChange}
          />
        </Field.Root>

        {error && (
          <Text color="red.500" fontSize="sm" mb={2}>
            {error}
          </Text>
        )}

        <Flex gap={2}>
          <Button
            variant="outline"
            flex={1}
            onClick={() => setEditing(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            layerStyle="headerBtn"
            flex={1}
            loading={loading}
            onClick={handleSave}
          >
            Guardar
          </Button>
        </Flex>
      </Box>
    )
  }

  return (
    <Box layerStyle="globalCard" p={4} textAlign="center">
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
      <Text textStyle="muted" mb={3}>
        {plan.durationMonths} {plan.durationMonths === 1 ? 'mes' : 'meses'}
      </Text>

      {error && (
        <Text color="red.500" fontSize="sm" mb={2}>
          {error}
        </Text>
      )}

      <Flex gap={2}>
        <Button variant="outline" flex={1} onClick={() => setEditing(true)}>
          Editar
        </Button>
        <Button
          colorPalette="red"
          flex={1}
          loading={loading}
          onClick={handleDelete}
        >
          Eliminar
        </Button>
      </Flex>
    </Box>
  )
}

export default PlanAdminCard
