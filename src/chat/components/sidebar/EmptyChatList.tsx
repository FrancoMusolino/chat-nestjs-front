import React from 'react'
import { Text } from '@chakra-ui/react'

import { useBrandTheme } from '@/shared/hooks'

export const EmptyChatList = () => {
  const { colors } = useBrandTheme()

  return (
    <Text textAlign='center' fontSize='xs' color={colors.brand['text-gray']}>
      Todavía no perteneces a ningún chat 😢
    </Text>
  )
}
