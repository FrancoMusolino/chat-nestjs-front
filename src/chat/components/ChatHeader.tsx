import React from 'react'
import { useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { Heading, HStack, MenuItem } from '@chakra-ui/react'

import { AddIntegrantModal } from './AddIntegrantModal'
import { Header } from './Header'
import { useLeaveChatMutation } from '../services/chat.service'
import { Avatar } from '@/shared/components/Avatar'
import { Menu } from '@/shared/components/Menu'
import { Modal } from '@/shared/components/Modal'
import { Alert } from '@/shared/components/Alert'
import { GetUserChatsResponse } from '@/shared/services/user.service'
import { useErrorMessage } from '@/shared/hooks'

export const ChatHeader = () => {
  const { chatId } = useParams()

  const queryClient = useQueryClient()

  const { data } = queryClient.getQueryData([
    'user-chats',
  ]) as AxiosResponse<GetUserChatsResponse>

  const selectedChat = data.chats.find((chat) => chat.id === chatId)

  const { mutate: leaveChat, error } = useLeaveChatMutation(chatId!)
  useErrorMessage(error)

  return (
    <Header>
      <HStack spacing={3}>
        <Avatar src={selectedChat?.avatar} isGroupPicture />
        <Heading fontSize='lg' fontWeight={500}>
          {selectedChat?.title}
        </Heading>
      </HStack>
      <Menu>
        <MenuItem>Info. del chat</MenuItem>
        <Modal
          trigger={MenuItem}
          triggerText='Sumar integrante'
          modalTitle='Sumar Integrante'
        >
          <AddIntegrantModal />
        </Modal>
        <Alert
          trigger={MenuItem}
          triggerText='Salir del grupo'
          alertTitle={`¿Deseas salir del grupo “${selectedChat?.title}”?`}
          btnText='Salir del grupo'
          action={leaveChat}
        />
      </Menu>
    </Header>
  )
}
