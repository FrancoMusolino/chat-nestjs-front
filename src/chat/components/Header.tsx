import React from 'react'
import { Heading, HStack, MenuItem } from '@chakra-ui/react'

import { CreateChat } from './CreateChat'

import { Avatar } from '@/shared/components/Avatar'
import { Menu } from '@/shared/components/Menu'
import { useStoreSelector } from '@/shared/app/store'
import { useBrandTheme } from '@/shared/hooks'
import { Alert } from '@/shared/components/Alert'
import { Modal } from '@/shared/components/Modal'

export const Header = () => {
  const { colors } = useBrandTheme()

  const { username, profilePicture } = useStoreSelector('session')

  return (
    <HStack
      as='header'
      h='75px'
      paddingBlock={4}
      paddingInline={3}
      justify='space-between'
      bgColor={colors.brand.secondary}
    >
      <HStack spacing={3}>
        <Avatar src={profilePicture} />
        <Heading fontSize='xl'>{username}</Heading>
      </HStack>
      <Menu>
        <MenuItem>Configuración</MenuItem>
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
        />
      </Menu>
    </HStack>
  )
}
