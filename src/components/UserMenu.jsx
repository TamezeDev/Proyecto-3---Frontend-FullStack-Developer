import { Menu, Portal, Avatar, Flex, Box, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import HeaderButton from './HeaderButton'

const UserMenu = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    return (
      <Flex gap={{ base: 6, md: 12 }} wrap="wrap" justifyContent="center">
        <HeaderButton name="Regístrate" />
        <HeaderButton name="Login" />
      </Flex>
    )
  }

  function handleLogout() {
    logout()
    navigate('/')
  }

  function handleSelect(value) {
    if (value === 'logout') {
      handleLogout()
      return
    }
    navigate(value)
  }

  return (
    <Menu.Root onSelect={(details) => handleSelect(details.value)}>
      <Flex
        alignItems="center"
        gap={3}
        flexDirection={{ base: 'row', md: 'row-reverse' }}
      >
        <Menu.Trigger asChild>
          <Box as="button" cursor="pointer" borderRadius="full" outline="none">
            <Avatar.Root size="xl" bg={'amber.light'} shadow={'md'}>
              <Avatar.Fallback textStyle={'profile'} name={user?.name} />
              <Avatar.Image src={user?.imageProfileUrl} />
            </Avatar.Root>
          </Box>
        </Menu.Trigger>
        <Text textStyle="profile">Hola, {user?.name}</Text>
      </Flex>

      <Portal>
        <Menu.Positioner>
          <Menu.Content layerStyle="userMenuContent">
            <Menu.ItemGroup title="Mi cuenta">
              <Menu.Item value="/profile">Mi perfil</Menu.Item>
              <Menu.Item value="/cards">Mis tarjetas</Menu.Item>
              <Menu.Item value="/premium">Pasar a premium</Menu.Item>
            </Menu.ItemGroup>

            {isAdmin && (
              <>
                <Menu.Separator />
                <Menu.ItemGroup title="Administración">
                  <Menu.Item value="/admin/users">Usuarios</Menu.Item>
                  <Menu.Item value="/admin/cards">
                    Tarjetas del sistema
                  </Menu.Item>
                  <Menu.Item value="/admin/plains">Planes premium</Menu.Item>
                  <Menu.Item value="/admin/books">Gestión de libros</Menu.Item>
                </Menu.ItemGroup>
              </>
            )}

            <Menu.Separator />
            <Menu.Item value="logout" color="red.500">
              Cerrar sesión
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default UserMenu
