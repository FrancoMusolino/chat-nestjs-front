import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

const baseStyle = definePartsStyle({
  button: {
    bg: 'transparent',
    _hover: {
      bgColor: 'initial',
    },
  },
  list: {
    // this will style the MenuList component
    minWidth: '175px',
    borderRadius: '5px',
    border: 'none',
    bg: 'brand.dropdown-background',
  },
  item: {
    // this will style the MenuItem and MenuItemOption components
    py: '8px',
    color: 'brand.text-white',
    bg: 'transparent',
    fontSize: 'sm',
    _hover: {
      bg: 'brand.secondary',
    },
    _focus: {
      bg: 'brand.secondary',
    },
  },
})

export const Menu = defineMultiStyleConfig({ baseStyle })
