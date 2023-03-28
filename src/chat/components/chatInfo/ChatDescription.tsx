import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Box, HStack, Text } from '@chakra-ui/react'
import { MdEdit, MdCheck } from 'react-icons/md'

import { useUpdateChatMutation } from '@/chat/services/chat.service'
import { LinkifyWrapper } from '@/shared/components/LinkifyWrapper'
import { useBrandColors, useErrorMessage } from '@/shared/hooks'
import { textRangeSelection } from '@/shared/utils'
import { LINES_BREAK_MORE_THAN_3_CONSECUTIVES } from '@/shared/constants'

type ChatDescriptionProps = {
  description: string
}

export const ChatDescription = ({ description }: ChatDescriptionProps) => {
  const { colors } = useBrandColors()

  const { chatId } = useParams()

  const editableTextRef = useRef<HTMLParagraphElement>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const { mutate: updateChat, error } = useUpdateChatMutation(chatId!)
  useErrorMessage(error)

  const handleFocus = () => {
    if (editableTextRef.current) {
      const length = editableTextRef.current.textContent?.length || 0

      textRangeSelection({
        element: editableTextRef.current,
        start: length,
        end: length,
      })
    }
  }

  const handleIsEditing = () => {
    setIsEditing(true)

    setTimeout(() => {
      editableTextRef.current?.focus()
    }, 0)
  }

  const handleFinishEditing = () => {
    setIsEditing(false)

    const newDescription = editableTextRef.current?.innerText
      .replace(LINES_BREAK_MORE_THAN_3_CONSECUTIVES, '\n\n')
      .trim()

    return updateChat({ description: newDescription })
  }

  return (
    <HStack
      w='full'
      justify='space-between'
      align='flex-start'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isEditing ? (
        <Text
          ref={editableTextRef}
          contentEditable
          suppressContentEditableWarning
          flexGrow={1}
          pb={1}
          fontSize='sm'
          wordBreak='break-word'
          whiteSpace='pre-wrap'
          borderBottom={`2px solid ${colors.primary}`}
          _focus={{ outline: 'none' }}
          onFocus={handleFocus}
          onBlur={handleFinishEditing}
        >
          {description}
        </Text>
      ) : description ? (
        <LinkifyWrapper>
          <Text
            flexGrow={1}
            fontSize='sm'
            wordBreak='break-word'
            whiteSpace='pre-wrap'
          >
            {description}
          </Text>
        </LinkifyWrapper>
      ) : (
        <Text
          flexGrow={1}
          fontSize='sm'
          fontWeight={700}
          color={colors.primary}
          cursor='pointer'
          userSelect='none'
          _hover={{ textDecor: 'underline' }}
          onClick={handleIsEditing}
        >
          Añade una descripción del grupo
        </Text>
      )}
      {isEditing ? (
        <Box
          alignSelf='flex-end'
          cursor='pointer'
          onClick={handleFinishEditing}
        >
          <MdCheck fill={colors['text-gray']} size='20px' />
        </Box>
      ) : (
        <Box
          cursor='pointer'
          visibility={
            isVisible && !isEditing && description ? 'visible' : 'hidden'
          }
          onClick={handleIsEditing}
        >
          <MdEdit fill={colors['text-gray']} size='20px' />
        </Box>
      )}
    </HStack>
  )
}
