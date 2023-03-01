import React, { ReactNode } from 'react'
import {
  Button as ChakraButton,
  ButtonProps as ButtonChakraProps,
  StyleProps,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { useBrandTheme } from '../hooks'

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
  const { colors } = useBrandTheme()

  if (btnType === 'cancel') {
    return (
      <BaseButton
        bgColor={colors.brand['button-gray']}
        _hover={{
          bgColor: colors.brand['secondary-hover'],
        }}
        _active={{
          bgColor: colors.brand['secondary-hover'],
        }}
        _disabled={{
          bgColor: colors.brand['button-gray'],
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
        bgColor={colors.brand.danger}
        _hover={{
          bgColor: colors.brand['danger-hover'],
        }}
        _active={{
          bgColor: colors.brand['danger-hover'],
        }}
        _disabled={{
          bgColor: colors.brand.danger,
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
    </BaseButton>
  )
}

const BaseButton = ({ children, ...props }: Omit<ButtonProps, 'btnType'>) => {
  const { colors } = useBrandTheme()

  return (
    <ChakraButton
      as={motion.button}
      whileTap={{ scale: 0.95 }}
      color={colors.brand['text-white']}
      fontSize='lg'
      fontWeight={700}
      {...props}
    >
      {children}
    </ChakraButton>
  )
}
