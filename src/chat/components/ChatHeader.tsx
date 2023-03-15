import React from 'react'
import { useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { Heading, HStack, MenuItem } from '@chakra-ui/react'

import { AddIntegrantModal } from './AddIntegrantModal'
import { Header } from './Header'
import { Avatar } from '@/shared/components/Avatar'
import { GetUserChatsResponse } from '@/shared/services/user.service'
import { Menu } from '@/shared/components/Menu'
import { Modal } from '@/shared/components/Modal'

export const ChatHeader = () => {
  const { chatId } = useParams()

  const queryClient = useQueryClient()

  const { data } = queryClient.getQueryData([
    'user-chats',
  ]) as AxiosResponse<GetUserChatsResponse>

  const selectedChat = data.chats.find((chat) => chat.id === chatId)

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
        <MenuItem>Salir del grupo</MenuItem>
      </Menu>
    </Header>
  )
}
