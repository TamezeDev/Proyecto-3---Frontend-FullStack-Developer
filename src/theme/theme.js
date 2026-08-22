import { createSystem, defineConfig, defaultConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  globalCss: {
    body: {
      bg: '{colors.paper.sepia}',
      fontFamily: 'body',
    },
    ul: {},
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Poppins', 'Segoe UI', sans-serif` },
        body: { value: `'Inter', 'Segoe UI', sans-serif` },
        reading: { value: `'Merriweather', 'Georgia', serif` },
      },

      spacing: {
        '4xs': { value: '0.125rem' }, // 2px
        '3xs': { value: '0.25rem' }, // 4px
        '2xs': { value: '0.5rem' }, // 8px
        xs: { value: '0.75rem' }, // 12px
        sm: { value: '1rem' }, // 16px
        md: { value: '1.5rem' }, // 24px
        lg: { value: '2rem' }, // 32px
        xl: { value: '3rem' }, // 48px
        '2xl': { value: '4rem' }, // 64px
        '3xl': { value: '6rem' }, // 96px},

        radii: {
          card: {
            value: '0.75rem',
            pill: '999px',
          },
        },
      },

      colors: {
        brand: {
          50: { value: '#fdf6ec' },
          100: { value: '#f8e8c9' },
          200: { value: '#f0d19c' },
          300: { value: '#e6b96f' },
          400: { value: '#d99a4e' },
          500: { value: '#c17f2e' },
          600: { value: '#9c631f' },
          700: { value: '#794c18' },
          800: { value: '#573611' },
          900: { value: '#3a240a' },
        },
        ink: {
          50: { value: '#f2f1ef' },
          100: { value: '#dcd9d4' },
          200: { value: '#b6b0a6' },
          300: { value: '#8b8377' },
          400: { value: '#5f584c' },
          500: { value: '#3d372c' },
          600: { value: '#2c2720' },
          700: { value: '#1f1b16' },
          800: { value: '#15120e' },
          900: { value: '#0b0906' },
        },
        paper: {
          light: { value: '#fbf6ec' },
          sepia: { value: '#f1e2c4' },
          dark: { value: '#1c1a17' },
        },
      },
    },

    semanticTokens: {
      colors: {
        'amber.medium': {
          value: { base: '{colors.brand.500}' },
        },
        'amber.high': {
          value: { base: '{colors.brand.600}' },
        },
      },
    },

    textStyles: {
      sectionTitle: {
        value: {
          fontSize: { base: '3xl', sm: '4xl', md: '5xl' },
          fontWeight: 'bold',
          color: 'amber.medium',
          fontFamily: 'heading',
        },
      },

      subSectionTitle: {
        value: {
          fontSize: { base: 'md', sm: 'xl' },
          fontWeight: 'italic',
          color: 'amber.high',
        },
      },
    },

    layerStyles: {
      circleImage: {
        value: {
          width: '100px',
          height: '100px',
          borderRadius: 'full',
          objectFit: 'cover',
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, customConfig)
