import { useState } from 'react'
import {
  Box,
  Flex,
  Heading,
  Input,
  Textarea,
  Field,
  Button,
  Text,
} from '@chakra-ui/react'

const API_URL = import.meta.env.VITE_API_URL

const emptyForm = {
  bookName: '',
  isbn: '',
  author: '',
  pages: '',
  synopsis: '',
  genreName: '',
  content: '',
}

const AddBookForm = ({ token, onCreated }) => {
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (
      !form.bookName ||
      !form.isbn ||
      !form.pages ||
      !form.synopsis ||
      !form.genreName ||
      !form.content
    ) {
      setError('Todos los campos son obligatorios, excepto el autor')
      return
    }

    const contentPages = form.content
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)

    if (contentPages.length === 0) {
      setError('El contenido debe tener al menos una página de texto')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/books/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookName: form.bookName,
          isbn: form.isbn,
          author: form.author || undefined,
          pages: Number(form.pages),
          synopsis: form.synopsis,
          genreName: form.genreName,
          content: contentPages,
        }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Error al añadir el libro')

      onCreated(result.data)
      setForm(emptyForm)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      layerStyle="globalCard"
      p={4}
      maxWidth="700px"
      margin="0 auto"
    >
      <Heading textStyle="title" as="h2" mb={4}>
        Añadir libro al catálogo
      </Heading>

      <Flex flexDirection="column" gap={3}>
        <Flex gap={3} wrap="wrap">
          <Field.Root flex="2 1 250px">
            <Field.Label>Título</Field.Label>
            <Input
              name="bookName"
              value={form.bookName}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root flex="1 1 150px">
            <Field.Label>ISBN</Field.Label>
            <Input name="isbn" value={form.isbn} onChange={handleChange} />
          </Field.Root>
        </Flex>

        <Flex gap={3} wrap="wrap">
          <Field.Root flex="1 1 200px">
            <Field.Label>Autor (opcional)</Field.Label>
            <Input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="Anónimo"
            />
          </Field.Root>
          <Field.Root flex="1 1 100px">
            <Field.Label>Páginas</Field.Label>
            <Input
              name="pages"
              type="number"
              value={form.pages}
              onChange={handleChange}
            />
          </Field.Root>
          <Field.Root flex="1 1 150px">
            <Field.Label>Género</Field.Label>
            <Input
              name="genreName"
              value={form.genreName}
              onChange={handleChange}
              placeholder="Fantasía"
            />
          </Field.Root>
        </Flex>

        <Field.Root>
          <Field.Label>Sinopsis</Field.Label>
          <Textarea
            name="synopsis"
            value={form.synopsis}
            onChange={handleChange}
            rows={3}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label>Contenido (una página por línea)</Field.Label>
          <Textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={8}
            placeholder={'Texto de la página 1...\nTexto de la página 2...'}
          />
        </Field.Root>
      </Flex>

      {error && (
        <Text color="red.500" fontSize="sm" mt={3}>
          {error}
        </Text>
      )}
      {success && (
        <Text color="green.600" fontSize="sm" mt={3}>
          Libro añadido correctamente.
        </Text>
      )}

      <Button type="submit" layerStyle="headerBtn" mt={4} loading={loading}>
        Añadir libro
      </Button>
    </Box>
  )
}

export default AddBookForm
