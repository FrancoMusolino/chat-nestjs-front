import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { FaBell } from 'react-icons/fa'

import { useBrandTheme } from '@/shared/hooks'

type NotificationBellProps = {
  unseenCount: number
}

export const NotificationBell = ({ unseenCount }: NotificationBellProps) => {
  const {
    colors: { brand },
  } = useBrandTheme()

  return (
    <Box pos='relative' cursor='pointer'>
      <FaBell size='20px' fill={brand['text-gray']} />
      <Text
        as='span'
        pos='absolute'
        bottom={-1}
        right={-1.5}
        w='15px'
        textAlign='center'
        fontSize='2xs'
        bgColor={brand.danger}
        borderRadius='full'
        userSelect='none'
      >
        {unseenCount}
      </Text>
    </Box>
  )
}
