import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Field,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

const API_URL = import.meta.env.VITE_API_URL

const ChangePassword = ({ token }) => {
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState('')
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const newPassValue = useWatch({ control, name: 'newPass' })

  async function onSubmit(data) {
    setServerError('')
    setSuccess('')
    try {
      const res = await fetch(`${API_URL}/users/modifyPass`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPass: data.currentPass,
          newPass: data.newPass,
          repeatNewPass: data.repeatNewPass,
        }),
      })
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Error al cambiar la contraseña')
      }

      setSuccess('Contraseña actualizada correctamente.')
      reset()
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <Box layerStyle="globalCard">
      <Heading textStyle="title" as="h2" mb={4}>
        Cambiar contraseña
      </Heading>

      <Flex
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        flexDirection="column"
        gap={4}
      >
        <Field.Root invalid={!!errors.currentPass}>
          <Field.Label>Contraseña actual</Field.Label>
          <Input
            type="password"
            {...register('currentPass', {
              required: 'Introduce tu contraseña actual',
            })}
          />
          <Field.ErrorText>{errors.currentPass?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.newPass}>
          <Field.Label>Nueva contraseña</Field.Label>
          <Input
            type="password"
            {...register('newPass', {
              required: 'La nueva contraseña es obligatoria',
              minLength: {
                value: 8,
                message: 'Debe tener al menos 8 caracteres',
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                message: 'Debe incluir mayúscula, minúscula, número y símbolo',
              },
            })}
          />
          <Field.ErrorText>{errors.newPass?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.repeatNewPass}>
          <Field.Label>Repite la nueva contraseña</Field.Label>
          <Input
            type="password"
            {...register('repeatNewPass', {
              required: 'Repite la nueva contraseña',
              validate: (value) =>
                value === newPassValue || 'Las contraseñas no coinciden',
            })}
          />
          <Field.ErrorText>{errors.repeatNewPass?.message}</Field.ErrorText>
        </Field.Root>

        {serverError && (
          <Text color="red.500" fontSize="sm" textAlign="center">
            {serverError}
          </Text>
        )}
        {success && (
          <Text color="green.500" fontSize="sm" textAlign="center">
            {success}
          </Text>
        )}

        <Button
          type="submit"
          loading={isSubmitting}
          layerStyle="headerBtn"
          width={'auto'}
        >
          Actualizar contraseña
        </Button>
      </Flex>
    </Box>
  )
}
export default ChangePassword
