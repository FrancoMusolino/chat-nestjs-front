import React, { Dispatch, SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Heading, HStack, MenuItem } from '@chakra-ui/react'

import { CreateChat } from '../CreateChat'
import { Header } from '../Header'
import { NotificationCenter } from './NotificationCenter'

import { Avatar } from '@/shared/components/Avatar'
import { Menu } from '@/shared/components/Menu'
import { useGlobalDispatch, useStoreSelector } from '@/shared/app/store'
import { Alert } from '@/shared/components/Alert'
import { Modal } from '@/shared/components/Modal'
import { endSession } from '@/shared/features/session/session.actions'

type ProfileHeaderProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ProfileHeader = ({ setIsOpen }: ProfileHeaderProps) => {
  const queryClient = useQueryClient()

  const { username, profilePicture } = useStoreSelector('session')
  const dispatch = useGlobalDispatch()

  return (
    <Header as='header'>
      <HStack spacing={3}>
        <Avatar src={profilePicture} />
        <Heading fontSize='xl'>{username}</Heading>
      </HStack>
      <HStack>
        <NotificationCenter />
        <Menu>
          <MenuItem onClick={() => setIsOpen(true)}>Configuración</MenuItem>
          <Modal
            trigger={MenuItem}
            triggerText='Nuevo Grupo'
            modalTitle='Crear Chat'
          >
            <CreateChat />
          </Modal>
          <Alert
            trigger={MenuItem}
            triggerText='Cerrar sesión'
            alertTitle='¿Deseas cerrar tú sesión?'
            btnText='Cerrar sesión'
            action={() => {
              dispatch(endSession())
              queryClient.clear()
            }}
          />
        </Menu>
      </HStack>
    </Header>
  )
}
