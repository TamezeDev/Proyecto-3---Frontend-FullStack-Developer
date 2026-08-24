import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, NavLink } from 'react-router-dom'
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Field,
} from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import { useScrollIntoView } from '../hooks/useScrollIntoView'

const Login = () => {
  const formRef = useScrollIntoView()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  async function onSubmit(data) {
    setServerError('')
    try {
      await login(data.email, data.password)
      navigate('/')
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <Flex justifyContent="center" p={{ base: 4, md: 8 }} marginBottom={8}>
      <Box layerStyle="globalCard" ref={formRef} maxWidth="450px" width="100%">
        <Heading textStyle="title" as="h1" textAlign="center" mb={6}>
          Inicia sesión
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gap={4}>
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

            <Field.Root invalid={!!errors.password}>
              <Field.Label>Contraseña</Field.Label>
              <Input
                type="password"
                {...register('password', {
                  required: 'La contraseña es obligatoria',
                })}
                placeholder="Tu contraseña"
              />
              <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
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
              Entrar
            </Button>

            <Text textStyle="muted" textAlign="center">
              ¿No tienes cuenta? Regístrate desde{' '}
              <NavLink to={'/register'}>
                <Text as={'span'} fontWeight="bold" cursor="pointer">
                  {' '}
                  aquí
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </form>
      </Box>
    </Flex>
  )
}

export default Login
