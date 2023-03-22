import React from 'react'
import { useParams } from 'react-router-dom'
import { HStack, Stack, Text } from '@chakra-ui/react'

import { useSelectedChat } from '../hooks/useSelectedChat'
import {
  useDeleteChatMutation,
  useLeaveChatMutation,
} from '../services/chat.service'
import { Button } from '@/shared/components/Button'
import { Alert } from '@/shared/components/Alert'
import { useBrandColors, useErrorMessage } from '@/shared/hooks'

type ChatDangerActionsProps = {
  /**@default false */
  showDeleteChatBtn?: boolean
}

export const ChatDangerActions = ({
  showDeleteChatBtn = false,
}: ChatDangerActionsProps) => {
  const { colors } = useBrandColors()

  const { chatId } = useParams()

  const { mutate: deleteChat, error: deleteChatError } = useDeleteChatMutation(
    chatId!
  )
  useErrorMessage(deleteChatError)

  const { mutate: leaveChat, error: leaveChatError } = useLeaveChatMutation(
    chatId!
  )
  useErrorMessage(leaveChatError)

  const { selectedChat } = useSelectedChat(chatId!)

  return (
    <HStack spacing={5} alignSelf='flex-end'>
      {showDeleteChatBtn && (
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
    </HStack>
  )
}
