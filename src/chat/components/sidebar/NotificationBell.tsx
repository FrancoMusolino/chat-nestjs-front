import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { FaBell } from 'react-icons/fa'

import { useBrandColors } from '@/shared/hooks'

type NotificationBellProps = {
  unseenCount: number
}

export const NotificationBell = ({ unseenCount }: NotificationBellProps) => {
  const { colors } = useBrandColors()

  return (
    <Box pos='relative' cursor='pointer'>
      <FaBell size='20px' fill={colors['text-gray']} />
      <Text
        as='span'
        pos='absolute'
        bottom={-1}
        right={-1.5}
        minW='15px'
        maxW='min-content'
        textAlign='center'
        fontSize='2xs'
        bgColor={colors.danger}
        borderRadius='full'
        userSelect='none'
      >
        {unseenCount}
      </Text>
    </Box>
  )
}
