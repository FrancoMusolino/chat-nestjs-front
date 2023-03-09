import React, { useState } from 'react'
import {
  Editable,
  EditableInput,
  EditablePreview,
  EditableProps,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'

import { useBrandTheme, useErrorMessage } from '@/shared/hooks'
import { useUpdateUserMutation } from '@/shared/services/user.service'
import { useGlobalDispatch, useStoreSelector } from '@/shared/app/store'
import { updateSession } from '@/shared/features/session/session.actions'

type SettingsEditableInputProps = EditableProps

const MAX_LENGTH = 55

export const SettingsEditableInput = ({
  ...props
}: SettingsEditableInputProps) => {
  const { colors } = useBrandTheme()

  const { id, status } = useStoreSelector('session')
  const dispatch = useGlobalDispatch()

  const initialCharsState = status.length

  const [chars, setChars] = useState(initialCharsState)
  const [value, setValue] = useState(status)
  const [visible, setVisible] = useState(false)

  const { mutate, error } = useUpdateUserMutation(id)
  useErrorMessage(error)

  const handleChange = (nextValue: string) => {
    setValue(nextValue)
    setChars(nextValue.length)
  }

  const hadleSubmit = (nextValue: string) => {
    setVisible(false)

    if (!nextValue) {
      setValue(status)
      setChars(initialCharsState)
      return
    }

    return mutate(
      { status: nextValue },
      {
        onSuccess: () => {
          dispatch(updateSession({ status: nextValue }))
        },
      }
    )
  }

  return (
    <Stack spacing={0}>
      <Text fontSize='sm' color={colors.brand.primary}>
        Tu estado
      </Text>
      <HStack w='full' align='flex-end' spacing={3}>
        <Editable
          value={value}
          borderBottom='1px solid'
          borderColor={colors.brand.secondary}
          w='92%'
          overflow='hidden'
          _focusWithin={{
            borderColor: colors.brand.primary,
          }}
          selectAllOnFocus={false}
          onEdit={() => setVisible(true)}
          onSubmit={hadleSubmit}
          onChange={handleChange}
          {...props}
        >
          <EditablePreview />
          <EditableInput
            maxLength={MAX_LENGTH}
            _focusVisible={{
              outline: 'none',
            }}
          />
        </Editable>
        {visible && (
          <Text fontSize='sm' color={colors.brand.primary} flexGrow={1}>
            {MAX_LENGTH - chars}
          </Text>
        )}
      </HStack>
    </Stack>
  )
}
