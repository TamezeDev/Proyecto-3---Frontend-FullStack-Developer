import { Flex } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Routing from './routing/Routing'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <Flex flexDirection={'column'} maxWidth={'1400px'} margin={'0 auto'}>
        <Header />
        <ScrollToTop />
        <main>
          <Routing />
        </main>
      </Flex>
    </BrowserRouter>
  )
}

export default App
