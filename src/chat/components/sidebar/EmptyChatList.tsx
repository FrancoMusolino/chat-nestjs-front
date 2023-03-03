import React from 'react'
import { Text } from '@chakra-ui/react'

import { useBrandTheme } from '@/shared/hooks'
import { ERROR_MESSAGES } from '@/shared/constants'

type EmptyChatListProps = {
  /**@default false */
  dueToFilter?: boolean
}

export const EmptyChatList = ({ dueToFilter = false }: EmptyChatListProps) => {
  const { colors } = useBrandTheme()

  return (
    <Text textAlign='center' fontSize='xs' color={colors.brand['text-gray']}>
      {dueToFilter
        ? ERROR_MESSAGES.CHAT_NOT_FOUND
        : ERROR_MESSAGES.EMPTY_CHAT_LIST}
    </Text>
  )
}
