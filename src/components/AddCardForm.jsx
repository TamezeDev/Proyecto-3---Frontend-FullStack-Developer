import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Field,
} from '@chakra-ui/react'

const API_URL = import.meta.env.VITE_API_URL

const AddCardForm = ({ token, onCardAdded }) => {
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(data) {
    setServerError('')
    try {
      const res = await fetch(`${API_URL}/cards/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Error al añadir la tarjeta')

      onCardAdded(result.data)
      reset()
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <Box layerStyle="globalCard">
      <Heading textStyle="title" as="h2" mb={4}>
        Añadir nueva tarjeta
      </Heading>

      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        flexDirection="column"
        gap={4}
      >
        <Field.Root invalid={!!errors.nameOwner}>
          <Field.Label>Nombre del titular</Field.Label>
          <Input
            {...register('nameOwner', {
              required: 'El nombre del titular es obligatorio',
            })}
            placeholder="NOMBRE APELLIDOS"
          />
          <Field.ErrorText>{errors.nameOwner?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.numberCard}>
          <Field.Label>Número de tarjeta</Field.Label>
          <Input
            {...register('numberCard', {
              required: 'El número de tarjeta es obligatorio',
              pattern: {
                value: /^\d{13,19}$/,
                message: 'Debe tener entre 13 y 19 dígitos, sin espacios',
              },
            })}
            placeholder="1234567812345678"
          />
          <Field.ErrorText>{errors.numberCard?.message}</Field.ErrorText>
        </Field.Root>

        <Flex gap={4}>
          <Field.Root invalid={!!errors.expiredDate} flex={1}>
            <Field.Label>Caducidad (MM/AA)</Field.Label>
            <Input
              {...register('expiredDate', {
                required: 'La caducidad es obligatoria',
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                  message: 'Formato MM/AA',
                },
              })}
              placeholder="12/30"
            />
            <Field.ErrorText>{errors.expiredDate?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.cvv} flex={1}>
            <Field.Label>CVV</Field.Label>
            <Input
              {...register('cvv', {
                required: 'El CVV es obligatorio',
                pattern: { value: /^\d{3,4}$/, message: '3 o 4 dígitos' },
              })}
              placeholder="123"
            />
            <Field.ErrorText>{errors.cvv?.message}</Field.ErrorText>
          </Field.Root>
        </Flex>

        {serverError && (
          <Text color="red.500" fontSize="sm" textAlign="center">
            {serverError}
          </Text>
        )}

        <Button type="submit" loading={isSubmitting} layerStyle="headerBtn">
          Añadir tarjeta
        </Button>
      </Flex>
    </Box>
  )
}

export default AddCardForm
