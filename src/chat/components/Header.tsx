import React from 'react'
import { Heading, HStack, MenuItem } from '@chakra-ui/react'

import { CreateChatModal } from './CreateChatModal'
import { Avatar } from '@/shared/components/Avatar'
import { Menu } from '@/shared/components/Menu'
import { useStoreSelector } from '@/shared/app/store'
import { useBrandTheme } from '@/shared/hooks'
import { Alert } from '@/shared/components/Alert'

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
        <CreateChatModal />
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
