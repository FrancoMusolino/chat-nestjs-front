import { modalAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  header: {
    fontSize: '2xl',
    fontWeight: 500,
  },

  dialog: {
    borderRadius: 'md',
    bg: `purple.100`,
  },
})

export const Modal = defineMultiStyleConfig({
  baseStyle,
})
