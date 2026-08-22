import { Flex } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
      <Flex flexDirection={'column'} maxWidth={'1400px'} margin={'0 auto'}>
        <Header />
      </Flex>
    </BrowserRouter>
  )
}

export default App
