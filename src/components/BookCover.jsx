import { useState } from 'react'
import { Image } from '@chakra-ui/react'
import genericCover from '../assets/image/genericBookCover.png'

const BookCover = ({ isbn, alt }) => {
  const [failed, setFailed] = useState(false)

  const [prevIsbn, setPrevIsbn] = useState(isbn)
  if (isbn !== prevIsbn) {
    setPrevIsbn(isbn)
    setFailed(false)
  }

  const coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg?default=false`

  return (
    <Image
      src={failed ? genericCover : coverUrl}
      alt={alt}
      onError={() => setFailed(true)}
      objectFit="cover"
      w="full"
      h="250px"
      borderRadius="md"
      mb={2}
    />
  )
}

export default BookCover
