import React, { ReactNode } from 'react'
import {
  Button as ChakraButton,
  ButtonProps as ButtonChakraProps,
  StyleProps,
  useTheme,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { BrandTheme } from '@/theme'

type ButtonProps = StyleProps &
  ButtonChakraProps & {
    children: ReactNode
  }

export const Button = ({ children, ...rest }: ButtonProps) => {
  const { colors } = useTheme<BrandTheme>()

  return (
    <ChakraButton
      as={motion.button}
      whileTap={{ scale: 0.95 }}
      color={colors.brand['text-white']}
      fontSize='lg'
      fontWeight={700}
      bgColor={colors.brand.primary}
      _hover={{
        bgColor: colors.brand['primary-hover'],
      }}
      _active={{
        bgColor: colors.brand['primary-hover'],
      }}
      _disabled={{
        bgColor: colors.brand.primary,
        opacity: 0.7,
        cursor: 'not-allowed',
      }}
      {...rest}
    >
      {children}
    </ChakraButton>
  )
}
