import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react'

const NewsCard = ({ item }) => {
  return (
    <Flex
      layerStyle={'newsCard'}
      as={'article'}
      flexDirection={'column'}
      gap={3}
    >
      <Image layerStyle={'cardsImage'} src={item.image} alt={item.title} />
      <Box layerStyle="boxCards">
        <Text textStyle="muted">{item.category}</Text>
        <Heading textStyle="title" as="h3">
          {item.title}
        </Heading>
        <Text textStyle="body" fontSize="sm">
          {item.excerpt}
        </Text>
      </Box>
    </Flex>
  )
}

export default NewsCard
