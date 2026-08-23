import { Flex, Box } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import Routing from './routing/Routing'
import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <Flex
        flexDirection={'column'}
        maxWidth={'1400px'}
        minHeight={'100vh'}
        margin={'0 auto'}
      >
        <Header />
        <ScrollToTop />
        <Box as="main" flex={'1'}>
          <Routing />
        </Box>
        <Footer />
      </Flex>
    </BrowserRouter>
  )
}

export default App
