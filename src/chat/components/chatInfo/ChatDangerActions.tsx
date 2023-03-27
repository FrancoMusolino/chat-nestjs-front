import React from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Text } from '@chakra-ui/react'

import { useSelectedChat } from '../../hooks/useSelectedChat'
import {
  useDeleteChatMutation,
  useLeaveChatMutation,
} from '../../services/chat.service'
import { Button } from '@/shared/components/Button'
import { Alert } from '@/shared/components/Alert'
import { useBrandColors, useErrorMessage } from '@/shared/hooks'
import { useStoreSelector } from '@/shared/app/store'

export const ChatDangerActions = () => {
  const { colors } = useBrandColors()

  const { chatId } = useParams()

  const { username } = useStoreSelector('session')

  const { selectedChat } = useSelectedChat(chatId!)
  const chatCreator = selectedChat?.createdBy

  const { mutate: deleteChat, error: deleteChatError } = useDeleteChatMutation(
    chatId!
  )
  useErrorMessage(deleteChatError)

  const { mutate: leaveChat, error: leaveChatError } = useLeaveChatMutation(
    chatId!
  )
  useErrorMessage(leaveChatError)

  return (
    <Stack spacing={5} maxW='65%' mx='auto'>
      <Alert
        trigger={Button}
        triggerText='Salir del grupo'
        triggerProps={{
          btnType: 'danger',
          fontSize: '15px',
          px: 10,
        }}
        alertTitle={`¿Deseas salir del grupo “${selectedChat?.title}”?`}
        btnText='Salir del grupo'
        action={leaveChat}
      />
      {chatCreator === username && (
        <Alert
          trigger={Button}
          triggerText='Eliminar Grupo'
          triggerProps={{
            btnType: 'danger',
            fontSize: '15px',
            px: 10,
          }}
          alertTitle={
            <Stack>
              <Text>
                Alto ✋ ¿Seguro deseas eliminar el grupo “{selectedChat?.title}
                ”?
              </Text>
              <Text as='span' fontSize='md' color={colors.danger}>
                Se perderán todos los mensajes
              </Text>
            </Stack>
          }
          btnText='Eliminar grupo'
          btnProps={{
            btnType: 'danger',
          }}
          action={deleteChat}
        />
      )}
    </Stack>
  )
}
