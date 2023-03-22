import React from 'react'
import { Badge, BadgeProps } from '@chakra-ui/react'

import { useBrandColors } from '@/shared/hooks'

type ChatTagProp = BadgeProps

export const ChatTag = ({ children, ...props }: ChatTagProp) => {
  const { colors } = useBrandColors()

  return (
    <Badge
      w='max-content'
      py={1}
      px={2}
      bgColor={colors.secondary}
      fontWeight={500}
      fontSize='sm'
      borderRadius={8}
      {...props}
    >
      {children}
    </Badge>
  )
}
