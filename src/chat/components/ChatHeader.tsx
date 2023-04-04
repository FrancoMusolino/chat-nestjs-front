import React from 'react'
import { useParams } from 'react-router-dom'
import { Heading, HStack, MenuItem } from '@chakra-ui/react'

import { AddIntegrantModal } from './AddIntegrantModal'
import { Header } from './Header'
import { useLeaveChatMutation } from '../services/chat.service'
import { useSelectedChat } from '../hooks/useSelectedChat'
import { Avatar } from '@/shared/components/Avatar'
import { Menu } from '@/shared/components/Menu'
import { Modal } from '@/shared/components/Modal'
import { Alert } from '@/shared/components/Alert'
import { useErrorMessage } from '@/shared/hooks'
import { useGlobalDispatch, useStoreSelector } from '@/shared/app/store'
import { changeInfoPanelVisibility } from '@/shared/features/chat/chat.actions'

export const ChatHeader = () => {
  const { chatId } = useParams()

  const { infoPanelIsVisible } = useStoreSelector('chat')
  const dispatch = useGlobalDispatch()

  const { selectedChat } = useSelectedChat(chatId!)

  const { mutate: leaveChat, error } = useLeaveChatMutation(chatId!)
  useErrorMessage(error)

  return (
    <Header spacing={0}>
      <HStack spacing={3}>
        <Avatar src={selectedChat?.avatar} isGroupPicture />
        <Heading
          fontSize='lg'
          fontWeight={500}
          whiteSpace='nowrap'
          overflow='hidden'
          textOverflow='ellipsis'
          maxW={infoPanelIsVisible ? '370px' : 'auto'}
        >
          {selectedChat?.title}
        </Heading>
      </HStack>
      <Menu>
        <MenuItem
          onClick={() =>
            dispatch(changeInfoPanelVisibility({ infoPanelIsVisible: true }))
          }
        >
          Info. del chat
        </MenuItem>
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
