import { useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  Input,
  Field,
  Button,
  Text,
} from '@chakra-ui/react'

const API_URL = import.meta.env.VITE_API_URL

const emptyForm = { name: '', price: '', durationMonths: '' }

const NewPlanForm = ({ token, onCreated }) => {
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.name || !form.price || !form.durationMonths) {
      setError('Todos los campos son obligatorios')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/plans/create`, {
        method: 'POST',
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
      if (!res.ok) throw new Error(result.error || 'Error al crear el plan')

      onCreated(result.data)
      setForm(emptyForm)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit} layerStyle="globalCard" p={4}>
      <Heading textStyle="title" as="h2" fontSize="lg" mb={3}>
        Nuevo plan premium
      </Heading>

      <Flex gap={3} wrap="wrap">
        <Field.Root flex="1 1 150px">
          <Field.Label>Nombre</Field.Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Plan Bianual"
          />
        </Field.Root>

        <Field.Root flex="1 1 120px">
          <Field.Label>Precio (€)</Field.Label>
          <Input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            placeholder="9.99"
          />
        </Field.Root>

        <Field.Root flex="1 1 120px">
          <Field.Label>Duración (meses)</Field.Label>
          <Input
            name="durationMonths"
            type="number"
            value={form.durationMonths}
            onChange={handleChange}
            placeholder="24"
          />
        </Field.Root>
      </Flex>

      {error && (
        <Text color="red.500" fontSize="sm" mt={2}>
          {error}
        </Text>
      )}

      <Button type="submit" layerStyle="headerBtn" mt={3} loading={loading}>
        Crear plan
      </Button>
    </Box>
  )
}

export default NewPlanForm
