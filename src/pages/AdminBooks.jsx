import { useState } from 'react'
import { Tabs, Heading, Flex } from '@chakra-ui/react'
import { useAuth } from '../hooks/useAuth'
import AddBookForm from '../components/AddBookForm'
import DisabledBooksTab from './DisabledBooksTab'
import AvailableBooksTab from '../components/AvailableBooksTab'

const AdminBooks = () => {
  const { token } = useAuth()
  const [availableRefreshKey, setAvailableRefreshKey] = useState(0)
  const [disabledRefreshKey, setDisabledRefreshKey] = useState(0)

  return (
    <Flex flexDirection="column" gap={6} p={{ base: 4, md: 8 }}>
      <Heading textStyle="sectionTitle" as="h1">
        Gestión de catálogo
      </Heading>

      <Tabs.Root defaultValue="available">
        <Tabs.List>
          <Tabs.Trigger value="available">Disponibles</Tabs.Trigger>
          <Tabs.Trigger value="disabled">No disponibles</Tabs.Trigger>
          <Tabs.Trigger value="add">Añadir libro</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="available">
          <AvailableBooksTab
            key={availableRefreshKey}
            token={token}
            onBookDisabled={() => setDisabledRefreshKey((prev) => prev + 1)}
          />
        </Tabs.Content>

        <Tabs.Content value="disabled">
          <DisabledBooksTab
            key={disabledRefreshKey}
            token={token}
            onBookEnabled={() => setAvailableRefreshKey((prev) => prev + 1)}
          />
        </Tabs.Content>

        <Tabs.Content value="add">
          <AddBookForm
            token={token}
            onCreated={() => setAvailableRefreshKey((prev) => prev + 1)}
          />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  )
}

export default AdminBooks
