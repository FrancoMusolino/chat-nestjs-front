import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge, HStack, MenuItem, Stack, Text } from '@chakra-ui/react'
import { BsChevronDown } from 'react-icons/bs'

import { useSelectedChat } from '../../hooks/useSelectedChat'
import { usePushOutIntegrantMutation } from '../../services/chat.service'
import { useBrandColors, useErrorMessage } from '@/shared/hooks'
import { Avatar } from '@/shared/components/Avatar'
import { Menu } from '@/shared/components/Menu'
import { Alert } from '@/shared/components/Alert'
import { DateTime } from '@/shared/helpers'

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
  const { colors } = useBrandColors()

  const { chatId } = useParams()
  const { selectedChat } = useSelectedChat(chatId!)

  const { mutate: pushOut, error } = usePushOutIntegrantMutation(chatId!)
  useErrorMessage(error)

  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const renderLastConnection = (date: string): string => {
    const dateTime = DateTime.createFromString(date)

    if (dateTime.isToday()) {
      return `hoy, ${dateTime.formatDate({ timeStyle: 'short' })}`
    }

    return dateTime.formatDate({ dateStyle: 'short', timeStyle: 'short' })
  }

  return (
    <HStack justify='space-between'>
      <HStack spacing={3}>
        <Avatar src={profilePicture} />
        <Stack spacing={1}>
          <HStack
            spacing={0}
            gap={2.5}
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
                  strategy: 'fixed',
                }}
                icon={BsChevronDown}
                menuButtonStyle={{
                  minW: 'min-content',
                  h: 'auto',
                  _active: {
                    bgColor: 'initial',
                  },
                  onClick: () => setIsOpen(!isOpen),
                }}
              >
                <Alert
                  trigger={MenuItem}
                  triggerText='Expulsar del Grupo'
                  alertTitle={`¿Deseas expulsar a “${username}” del grupo “${selectedChat?.title}”?`}
                  btnText='Expulsar'
                  action={() => pushOut({ username })}
                  onCloseComplete={() => {
                    setIsVisible(false)
                    setIsOpen(false)
                  }}
                />
              </Menu>
            )}
          </HStack>
          <Text
            maxW='130px'
            fontSize='xs'
            lineHeight={1}
            color={colors['text-gray']}
            whiteSpace='nowrap'
            overflow='hidden'
            textOverflow='ellipsis'
          >
            {status}
          </Text>
        </Stack>
      </HStack>
      <Stack spacing={1} alignItems='flex-end'>
        {isCreator && (
          <Badge
            w='min-content'
            bgColor={colors.secondary}
            fontSize='xs'
            fontWeight={500}
            textTransform='none'
          >
            Creador del grupo
          </Badge>
        )}
        <Text
          fontSize='11px'
          textTransform={lastConnection ? 'none' : 'uppercase'}
          color={colors['text-gray']}
        >
          {connected
            ? 'En línea'
            : lastConnection
            ? `Ult. conexión ${renderLastConnection(lastConnection)}`
            : 'Nunca se conectó'}
        </Text>
      </Stack>
    </HStack>
  )
}
