import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Editable,
  EditableInput,
  EditablePreview,
  EditableProps,
  HStack,
  Text,
} from '@chakra-ui/react'

import { useBrandColors, useErrorMessage } from '@/shared/hooks'
import {
  UpdateChatRequest,
  useUpdateChatMutation,
} from '@/chat/services/chat.service'

type EditableFielProps = {
  fieldToUpdate: keyof UpdateChatRequest
  inputMaxLength: number
} & EditableProps

export const EditableField = ({
  inputMaxLength,
  fieldToUpdate,
  value: initialValue = '',
  ...props
}: EditableFielProps) => {
  const { colors } = useBrandColors()

  const { chatId } = useParams()

  const initialCharsState = initialValue.length
  const [chars, setChars] = useState(initialCharsState)

  const [value, setValue] = useState(initialValue)
  const [visible, setVisible] = useState(false)

  const { mutate: updateChat, error } = useUpdateChatMutation(chatId!)
  useErrorMessage(error)

  useEffect(() => {
    setValue(initialValue)
    setChars(initialCharsState)
  }, [initialValue])

  const handleChange = (nextValue: string) => {
    setValue(nextValue)
    setChars(nextValue.length)
  }

  const hadleSubmit = (nextValue: string) => {
    setVisible(false)

    if (!nextValue) {
      setValue(initialValue)
      setChars(initialCharsState)
      return
    }

    return updateChat({ [fieldToUpdate]: nextValue })
  }

  return (
    <Editable
      value={value}
      selectAllOnFocus={false}
      onEdit={() => setVisible(true)}
      onChange={handleChange}
      onSubmit={hadleSubmit}
      {...props}
    >
      {({ isEditing }) => (
        <HStack textAlign={isEditing ? 'left' : 'center'}>
          <EditablePreview
            as='h3'
            p={0}
            fontSize='xl'
            fontWeight={500}
            lineHeight={1}
            wordBreak='break-all'
          />
          <EditableInput
            maxLength={inputMaxLength}
            p={0}
            fontSize='xl'
            borderRadius={0}
            _focusVisible={{
              outline: 'none',
              borderBottom: `2px solid ${colors.primary}`,
            }}
          />
          {visible && (
            <Text fontSize='sm' color={colors.primary} flexGrow={1}>
              {inputMaxLength - chars}
            </Text>
          )}
        </HStack>
      )}
    </Editable>
  )
}
