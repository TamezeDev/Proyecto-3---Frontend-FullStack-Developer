import { SimpleGrid } from '@chakra-ui/react'
import NewsCard from '../components/NewsCard.jsx'
import newsData from '../assets/data/indexData.js'

const Index = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, sm: 2, lg: 3 }}
      justifyItems={'center'}
      gap={6}
      p={{ base: 4, md: 6 }}
    >
      {newsData.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </SimpleGrid>
  )
}

export default Index
