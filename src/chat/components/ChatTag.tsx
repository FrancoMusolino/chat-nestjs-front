import React from 'react'
import { Badge, BadgeProps } from '@chakra-ui/react'

import { useBrandTheme } from '@/shared/hooks'

type ChatTagProp = BadgeProps

export const ChatTag = ({ children, ...props }: ChatTagProp) => {
  const {
    colors: { brand },
  } = useBrandTheme()

  return (
    <Badge
      w='max-content'
      py={1}
      px={2}
      bgColor={brand.secondary}
      fontWeight={500}
      fontSize='sm'
      borderRadius={8}
      {...props}
    >
      {children}
    </Badge>
  )
}
