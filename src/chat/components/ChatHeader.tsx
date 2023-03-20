import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Heading, HStack, MenuItem } from '@chakra-ui/react'

import { AddIntegrantModal } from './AddIntegrantModal'
import { Header } from './Header'
import { useLeaveChatMutation } from '../services/chat.service'
import { Avatar } from '@/shared/components/Avatar'
import { Menu } from '@/shared/components/Menu'
import { Modal } from '@/shared/components/Modal'
import { Alert } from '@/shared/components/Alert'
import { useErrorMessage } from '@/shared/hooks'
import { useSelectedChat } from '../hooks/useSelectedChat'

export const ChatHeader = () => {
  const { chatId } = useParams()
  const navigate = useNavigate()

  const { selectedChat } = useSelectedChat(chatId!)

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
        <MenuItem onClick={() => navigate('info')}>Info. del chat</MenuItem>
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
