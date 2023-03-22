import React from 'react'
import { Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { useSelectedChat } from '../hooks/useSelectedChat'
import { Avatar } from '@/shared/components/Avatar'
import { useBrandTheme } from '@/shared/hooks'
import { ChatDangerActions } from './ChatDangerActions'

export const ChatDetails = () => {
  const {
    colors: { brand },
  } = useBrandTheme()

  const { chatId } = useParams()

  const { selectedChat } = useSelectedChat(chatId!)

  return (
    <HStack
      py={10}
      px={16}
      spacing={14}
      borderBottom={`15px solid ${brand.secondary}`}
    >
      <Stack spacing={4}>
        <Avatar src={selectedChat?.avatar} boxSize='170px' isGroupPicture />
        <Stack spacing={0} align='center'>
          <Heading fontSize='2xl'>{selectedChat?.title}</Heading>
          <Text fontSize='sm' color={brand['text-gray']}>
            Grupo - 15 participantes
          </Text>
        </Stack>
      </Stack>
      <Stack
        h='210px'
        flexGrow={1}
        alignSelf='flex-end'
        justify='space-between'
      >
        <Stack>
          <Text
            fontSize='sm'
            fontWeight={700}
            color={brand.primary}
            cursor='pointer'
            _hover={{ textDecor: 'underline' }}
          >
            Añade una descripción del grupo
          </Text>
          <Text fontSize='sm' color={brand['text-gray']}>
            Grupo creado por Juancito el 10/02/2023, 19:43hs
          </Text>
        </Stack>
        <ChatDangerActions />
      </Stack>
    </HStack>
  )
}
