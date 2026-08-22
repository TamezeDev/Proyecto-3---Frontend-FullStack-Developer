import { Flex } from '@chakra-ui/react'
import Header from './components/Header'

function App() {
  return (
    <Flex flexDirection={'column'} maxWidth={'1400px'} margin={'0 auto'}>
      <Header />
    </Flex>
  )
}

export default App
