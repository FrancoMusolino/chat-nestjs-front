import React, { ReactNode } from 'react'
import {
  Button as ChakraButton,
  ButtonProps as ButtonChakraProps,
  StyleProps,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { useBrandColors } from '../hooks'

export type ButtonProps = StyleProps &
  ButtonChakraProps & {
    children: ReactNode

    /**@default primary */
    btnType?: 'primary' | 'cancel' | 'danger'
  }

export const Button = ({
  children,
  btnType = 'primary',
  ...rest
}: ButtonProps) => {
  const { colors } = useBrandColors()

  if (btnType === 'cancel') {
    return (
      <BaseButton
        bgColor={colors['button-gray']}
        _hover={{
          bgColor: colors['secondary-hover'],
        }}
        _active={{
          bgColor: colors['secondary-hover'],
        }}
        _disabled={{
          bgColor: colors['button-gray'],
          opacity: 0.7,
          cursor: 'not-allowed',
        }}
        {...rest}
      >
        {children}
      </BaseButton>
    )
  }

  if (btnType === 'danger') {
    return (
      <BaseButton
        bgColor={colors.danger}
        _hover={{
          bgColor: colors['danger-hover'],
        }}
        _active={{
          bgColor: colors['danger-hover'],
        }}
        _disabled={{
          bgColor: colors.danger,
          opacity: 0.7,
          cursor: 'not-allowed',
        }}
        {...rest}
      >
        {children}
      </BaseButton>
    )
  }

  return (
    <BaseButton
      bgColor={colors.primary}
      _hover={{
        bgColor: colors['primary-hover'],
      }}
      _active={{
        bgColor: colors['primary-hover'],
      }}
      _disabled={{
        bgColor: colors.primary,
        opacity: 0.7,
        cursor: 'not-allowed',
      }}
      {...rest}
    >
      {children}
    </BaseButton>
  )
}

const BaseButton = ({ children, ...props }: Omit<ButtonProps, 'btnType'>) => {
  const { colors } = useBrandColors()

  return (
    <ChakraButton
      as={motion.button}
      whileTap={{ scale: 0.95 }}
      color={colors['text-white']}
      fontSize='lg'
      fontWeight={700}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}
