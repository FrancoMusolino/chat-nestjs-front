import React, { ReactNode } from 'react'
import { Link } from '@chakra-ui/react'
import Linkify from 'react-linkify'

import { useBrandColors } from '../hooks'

type LinkifyWrapperProps = {
  children: ReactNode
}

export const LinkifyWrapper = ({ children }: LinkifyWrapperProps) => {
  const { colors } = useBrandColors()

  return (
    <Linkify
      componentDecorator={(decoratedText: string) => (
        <Link
          key={Math.random() * 1000}
          color={colors.link}
          _hover={{ textDecor: 'underline' }}
          target='blank'
          rel='noreferrer noopener'
          href={decoratedText}
        >
          {decoratedText}
        </Link>
      )}
    >
      {children}
    </Linkify>
  )
}
