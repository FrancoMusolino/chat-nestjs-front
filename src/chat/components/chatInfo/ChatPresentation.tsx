import React from 'react'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { useSelectedChat } from '../../hooks/useSelectedChat'
import { Avatar } from '@/shared/components/Avatar'
import { useBrandColors } from '@/shared/hooks'
import { useGetChat } from '../../services/chat.service'

export const ChatPresentation = () => {
  const { colors } = useBrandColors()

  const { chatId } = useParams()

  const { data, isLoading } = useGetChat(chatId!)
  const chatUsersCount = data?.data.userIDs.length

  const { selectedChat } = useSelectedChat(chatId!)

  return (
    <Stack align='center' spacing={4} px={6}>
      <Avatar src={selectedChat?.avatar} boxSize='170px' isGroupPicture />
      <Stack spacing={0} align='center' textAlign='center'>
        <Heading fontSize='xl' fontWeight={500} wordBreak='break-all'>
          {selectedChat?.title}
        </Heading>
        <Text fontSize='sm' color={colors['text-gray']}>
          Grupo -{' '}
          {isLoading
            ? 'Cargando...'
            : chatUsersCount! > 1
            ? `${chatUsersCount} participantes`
            : '1 participante'}
        </Text>
      </Stack>
    </Stack>
  )
}
