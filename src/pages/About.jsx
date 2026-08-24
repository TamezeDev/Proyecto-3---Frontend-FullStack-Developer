import { Box, Flex, Heading, Text, SimpleGrid, Icon } from '@chakra-ui/react'
import { features, steps } from '../assets/data/aboutData'
import { useScrollIntoView } from '../hooks/useScrollIntoView'

const About = () => {
  const formRef = useScrollIntoView()

  return (
    <Flex
      flexDirection="column"
      gap={{ base: 10, md: 16 }}
      p={{ base: 4, md: 8 }}
    >
      <Box ref={formRef} textAlign="center" maxWidth="700px" margin="0 auto">
        <Heading textStyle="sectionTitle" as="h1">
          Conócenos
        </Heading>
        <Text textStyle="subSectionTitle" mt={4}>
          Un rincón pensado para quienes nunca dejan de leer
        </Text>
        <Text textStyle="body" mt={6}>
          El rincón de la tinta nace para resolver un problema sencillo:
          encontrar un lugar donde leer sea cómodo, ordenado y siempre
          disponible. Sin anuncios que interrumpan el capítulo, sin perder la
          página por la que ibas, y con un catálogo que crece cuidado por
          personas, no solo por algoritmos.
        </Text>
      </Box>

      <Box>
        <Heading textStyle="title" as="h2" textAlign="center" mb={8}>
          Qué encontrarás aquí
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
          {features.map((feature) => (
            <Box key={feature.title} layerStyle="globalCard" textAlign="center">
              <Icon as={feature.icon} boxSize={8} color="amber.high" mb={3} />
              <Heading as="h3" textStyle="title" fontSize="lg" mb={2}>
                {feature.title}
              </Heading>
              <Text textStyle="muted">{feature.text}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      <Box>
        <Heading textStyle="title" as="h2" textAlign="center" mb={8}>
          Cómo funciona
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={6}>
          {steps.map((step) => (
            <Flex
              key={step.number}
              flexDirection="column"
              alignItems="center"
              textAlign="center"
              gap={2}
            >
              <Text
                textStyle="sectionTitle"
                fontSize="3xl"
                color="amber.strong"
              >
                {step.number}
              </Text>
              <Heading as="h3" textStyle="title" fontSize="md">
                {step.title}
              </Heading>
              <Text textStyle="muted">{step.text}</Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>

      <Box textAlign="center" maxWidth="650px" margin="0 auto">
        <Heading textStyle="title" as="h2" mb={4}>
          A quién va dirigido
        </Heading>
        <Text textStyle="body">
          Pensamos esta plataforma para lectores habituales que quieren
          organizar su colección personal, retomar la lectura sin fricción entre
          dispositivos, y descubrir nuevos títulos sin perder tiempo decidiendo.
          Ya sea que leas cinco minutos antes de dormir o maratonees un libro en
          un fin de semana, El rincón de la tinta se adapta a tu ritmo, no al
          revés.
        </Text>
      </Box>

      <Box textAlign="center" borderTop="1px solid {colors.amber.light}" pt={8}>
        <Text textStyle="muted">
          Este proyecto forma parte de un trabajo académico, desarrollado con
          fines educativos como demostración de una arquitectura full-stack
          completa.
        </Text>
      </Box>
    </Flex>
  )
}

export default About
