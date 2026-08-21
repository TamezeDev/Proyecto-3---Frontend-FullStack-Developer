import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  globalCss: {
    body: {
      backgroundColor: 'green.100',
      minHeight: '100vh',
      width: '100vW',
    },
    ul: {
      listStyle: 'none',
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Roboto', sans-serif` },
        body: { value: `'Inter', sans-serif` },
      },
      spacing: {
        sectionPadding: { value: '60px' },
        cardGap: { value: '24px' },
      },
    },
    semanticTokens: {
      colors: {
        heading: { value: '{colors.green.700}' },
        bodyText: { value: '{colors.gray.700}' },
        mutedText: { value: '{colors.gray.600}' },
        sectionBgAlt: { value: '{colors.green.50}' },
        ctaBg: { value: '{colors.green.700}' },
      },
    },
    textStyles: {
      sectionTitle: {
        value: {
          fontSize: { base: 'xl', md: '2xl' },
          fontWeight: 'bold',
          color: '{colors.green.700}',
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
