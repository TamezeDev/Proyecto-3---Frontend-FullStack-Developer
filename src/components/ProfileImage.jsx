import { useState, useRef } from 'react'
import { Flex, Heading, Button, Text, Avatar } from '@chakra-ui/react'

const API_URL = import.meta.env.VITE_API_URL

const ProfileImage = ({ user, token, updateUser }) => {
  const [preview, setPreview] = useState(user?.imageProfileUrl || '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    uploadImage(file)
  }

  async function uploadImage(file) {
    setError('')
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)

      const res = await fetch(`${API_URL}/users/imgProfile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || 'Error al subir la imagen')
      }

      updateUser({ imageProfileUrl: result.updated.imageProfileUrl })
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <Flex
      layerStyle="globalCard"
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Heading textStyle="title" as="h2" mb={4}>
        Imagen de perfil
      </Heading>

      <Avatar.Root size="2xl" mx="auto" mr={4}>
        <Avatar.Fallback name={user?.name} />
        <Avatar.Image src={preview} />
      </Avatar.Root>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <Button
        layerStyle="headerBtn"
        width={'auto'}
        loading={uploading}
        onClick={() => fileInputRef.current.click()}
      >
        Cambiar imagen
      </Button>

      {error && (
        <Text color="red.500" fontSize="sm" mt={2}>
          {error}
        </Text>
      )}
    </Flex>
  )
}

export default ProfileImage
