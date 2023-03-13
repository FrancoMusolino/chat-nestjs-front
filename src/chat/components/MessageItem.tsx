import React from 'react'
import { Box, HStack, Stack, Text } from '@chakra-ui/react'

import { Avatar } from '@/shared/components/Avatar'
import { useBrandTheme } from '@/shared/hooks'

type MessageItemProps = {
  isConsecutive: boolean
  isSender: boolean
}

export const MessageItem = ({ isConsecutive, isSender }: MessageItemProps) => {
  const {
    colors: { brand },
  } = useBrandTheme()

  return (
    <HStack
      justify={isSender ? 'flex-end' : 'flex-start'}
      align='flex-start'
      spacing={0}
      gap={2}
    >
      <Box w='35px' order={isSender ? 2 : 1}>
        {!isConsecutive && <Avatar boxSize='35px' />}
      </Box>
      <Stack
        maxW='65%'
        order={isSender ? 1 : 2}
        spacing={0}
        px={2.5}
        py={1}
        bgColor={isSender ? brand.primary : brand.secondary}
        borderRadius={10}
      >
        {!isSender && !isConsecutive && (
          <Text alignSelf='flex-start' fontSize='sm' color={brand['text-gray']}>
            Juan
          </Text>
        )}
        <Text fontSize='15px'>Hola sale algo?ale algo?</Text>
        <Text alignSelf='flex-end' fontSize='xs' color={brand['text-gray']}>
          19:03
        </Text>
      </Stack>
    </HStack>
  )
}
