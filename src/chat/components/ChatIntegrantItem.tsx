import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge, HStack, MenuItem, Stack, Text } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'

import { useSelectedChat } from '../hooks/useSelectedChat'
import { usePushOutIntegrantMutation } from '../services/chat.service'
import { useBrandTheme, useErrorMessage } from '@/shared/hooks'
import { Avatar } from '@/shared/components/Avatar'
import { Menu } from '@/shared/components/Menu'
import { Alert } from '@/shared/components/Alert'

type ChatIntegrantItemProps = {
  username: string
  profilePicture?: string
  status: string
  connected: boolean
  lastConnection?: string
  isCreator: boolean
  showMenu?: boolean
}

export const ChatIntegrantItem = ({
  username,
  profilePicture,
  status,
  connected,
  lastConnection,
  isCreator,
  showMenu = false,
}: ChatIntegrantItemProps) => {
  const {
    colors: { brand },
  } = useBrandTheme()

  const { chatId } = useParams()
  const { selectedChat } = useSelectedChat(chatId!)

  const { mutate: pushOut, error } = usePushOutIntegrantMutation(chatId!)
  useErrorMessage(error)

  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <HStack justify='space-between'>
      <HStack spacing={3}>
        <Avatar src={profilePicture} />
        <Stack spacing={1}>
          <HStack
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => !isOpen && setIsVisible(false)}
          >
            <Text fontSize='lg' lineHeight={1}>
              {username}
            </Text>
            {showMenu && isVisible && (
              <Menu
                menuProps={{
                  computePositionOnMount: true,
                  closeOnSelect: false,
                }}
                icon={BsChevronDown}
                menuButtonStyle={{
                  minW: 'min-content',
                  h: 'auto',
                  _active: {
                    bgColor: 'initial',
                  },
                  onClick: () => setIsOpen(true),
                }}
              >
                <Alert
                  trigger={MenuItem}
                  triggerText='Expulsar del Grupo'
                  alertTitle={`¿Deseas expulsar a “${username}” del grupo “${selectedChat?.title}”?`}
                  btnText='Expulsar'
                  action={() => pushOut({ username })}
                  onCloseComplete={() => {
                    setIsOpen(false)
                    setIsVisible(false)
                  }}
                />
              </Menu>
            )}
          </HStack>
          <Text fontSize='xs' lineHeight={1} color={brand['text-gray']}>
            {status}
          </Text>
        </Stack>
      </HStack>
      <HStack spacing={3}>
        {isCreator && (
          <Badge
            bgColor={brand.secondary}
            fontSize='xs'
            fontWeight={500}
            textTransform='none'
          >
            Creador del grupo
          </Badge>
        )}
        <Text
          fontSize='xs'
          textTransform='uppercase'
          color={brand['text-gray']}
        >
          {connected
            ? 'En línea'
            : lastConnection
            ? 'hola'
            : 'Nunca se conectó'}
        </Text>
      </HStack>
    </HStack>
  )
}
