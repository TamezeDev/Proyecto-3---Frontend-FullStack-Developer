// Index.jsx — SOLO TEMPORAL, para probar, lo quitamos después
import { useAuth } from '../hooks/useAuth'
import { Button } from '@chakra-ui/react'
const Library = () => {
  const { login, user } = useAuth()

  async function handleTestLogin() {
    try {
      const loggedUser = await login('sergio.castro@example.com', 'Clave27&')
      console.log('Usuario logueado:', loggedUser)
    } catch (err) {
      console.error('Fallo el login de prueba:', err.message)
    }
  }

  return (
    <>
      <Button onClick={handleTestLogin}>Probar login (temporal)</Button>
    </>
  )
}

export default Library
