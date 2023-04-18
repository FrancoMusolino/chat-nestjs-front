import { alertAnatomy } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  theme as originTheme,
} from '@chakra-ui/react'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  alertAnatomy.keys
)

export const Alert = defineMultiStyleConfig({
  variants: {
    solid: (props: any) => {
      const { colorScheme: c } = props

      if (c === 'green') {
        return {
          container: {
            bg: 'brand.primary',
            color: 'brand.text-white',
          },
        }
      }

      if (c === 'red') {
        return {
          container: {
            bg: 'brand.danger',
            color: 'brand.text-white',
          },
        }
      }

      return originTheme.components.Alert.variants!.solid(props)
    },
  },
})
