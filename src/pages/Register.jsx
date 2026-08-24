import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { useScrollIntoView } from '../hooks/useScrollIntoView'
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

const Register = () => {
  const formRef = useScrollIntoView()
  const [serverError, setServerError] = useState('')
  const [registered, setRegistered] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm()

  const passwordValue = useWatch({ control, name: 'password' })

  async function onSubmit(data) {
    setServerError('')
    try {
      const res = await fetch(`${API_URL}/users/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          birthDate: data.birthDate,
        }),
      })
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Error al registrar la cuenta')
      }

      setRegistered(true)
    } catch (err) {
      setServerError(err.message)
    }
  }

  return registered ? (
    <Flex justifyContent="center" p={{ base: 4, md: 8 }} marginBottom={8}>
      <Box
        layerStyle="globalCard"
        ref={formRef}
        maxWidth="500px"
        width="100%"
        textAlign="center"
      >
        <Heading textStyle="title" as="h1" mb={4}>
          ¡Cuenta creada con éxito!
        </Heading>
        <Text textStyle="body" mb={6}>
          Ya puedes iniciar sesión con tu email y contraseña.
        </Text>
        <Button asChild layerStyle="headerBtn" width="100%">
          <NavLink to="/login">Ir a iniciar sesión</NavLink>
        </Button>
      </Box>
    </Flex>
  ) : (
    <Flex justifyContent="center" p={{ base: 4, md: 8 }} marginBottom={8}>
      <Box layerStyle="globalCard" ref={formRef} maxWidth="500px" width="100%">
        <Heading textStyle="title" as="h1" textAlign="center" mb={6}>
          Crea tu cuenta
        </Heading>
        <Flex
          as={'form'}
          onSubmit={handleSubmit(onSubmit)}
          flexDirection="column"
          gap={4}
        >
          <Field.Root invalid={!!errors.name}>
            <Field.Label>Nombre</Field.Label>
            <Input
              {...register('name', { required: 'El nombre es obligatorio' })}
              placeholder="Lucía"
            />
            <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.lastName}>
            <Field.Label>Apellidos</Field.Label>
            <Input
              {...register('lastName', {
                required: 'Los apellidos son obligatorios',
              })}
              placeholder="García"
            />
            <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input
              type="email"
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Introduce un email válido',
                },
              })}
              placeholder="tucorreo@ejemplo.com"
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.birthDate}>
            <Field.Label>Fecha de nacimiento</Field.Label>
            <Input
              type="date"
              {...register('birthDate', {
                required: 'La fecha de nacimiento es obligatoria',
              })}
            />
            <Field.ErrorText>{errors.birthDate?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.password}>
            <Field.Label>Contraseña</Field.Label>
            <Input
              type="password"
              {...register('password', {
                required: 'La contraseña es obligatoria',
                minLength: {
                  value: 8,
                  message: 'Debe tener al menos 8 caracteres',
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
                  message:
                    'Debe incluir mayúscula, minúscula, número y símbolo',
                },
              })}
              placeholder="Contraseña segura"
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.repeatPassword}>
            <Field.Label>Repite la contraseña</Field.Label>
            <Input
              type="password"
              {...register('repeatPassword', {
                required: 'Repite la contraseña',
                validate: (value) =>
                  value === passwordValue || 'Las contraseñas no coinciden',
              })}
              placeholder="Repite contraseña"
            />
            <Field.ErrorText>{errors.repeatPassword?.message}</Field.ErrorText>
          </Field.Root>

          {serverError && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {serverError}
            </Text>
          )}

          <Button
            type="submit"
            loading={isSubmitting}
            layerStyle="headerBtn"
            width="100%"
          >
            Registrarme
          </Button>

          <Text textStyle="muted" textAlign="center">
            ¿Ya tienes cuenta? Puedes iniciar sesión desde{' '}
            <NavLink to={'/login'}>
              <Text as={'span'} fontWeight="bold" cursor="pointer">
                {' '}
                aquí
              </Text>
            </NavLink>
          </Text>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Register
