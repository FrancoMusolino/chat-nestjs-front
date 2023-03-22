import React from 'react'
import { useParams } from 'react-router-dom'
import { HStack } from '@chakra-ui/react'

import { useSelectedChat } from '../hooks/useSelectedChat'
import { useLeaveChatMutation } from '../services/chat.service'
import { Button } from '@/shared/components/Button'
import { Alert } from '@/shared/components/Alert'
import { useErrorMessage } from '@/shared/hooks'

export const ChatDangerActions = () => {
  const { chatId } = useParams()

  const { mutate: leaveChat, error: leaveChatError } = useLeaveChatMutation(
    chatId!
  )
  useErrorMessage(leaveChatError)

  const { selectedChat } = useSelectedChat(chatId!)

  return (
    <HStack spacing={5} alignSelf='flex-end'>
      <Button btnType='danger' fontSize='15px' px={10}>
        Eliminar Grupo
      </Button>
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
