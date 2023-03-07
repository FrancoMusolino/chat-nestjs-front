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

import { useBrandTheme } from '@/shared/hooks'

type SettingsEditableInputProps = EditableProps & { label: string }

const MAX_LENGTH = 55

export const SettingsEditableInput = ({
  defaultValue,
  label,
  ...props
}: SettingsEditableInputProps) => {
  const { colors } = useBrandTheme()

  const initialCharsState = defaultValue?.length || 0

  const [chars, setChars] = useState(initialCharsState)
  const [value, setValue] = useState(defaultValue)
  const [visible, setVisible] = useState(false)

  const hadleSubmit = (nextValue: string) => {
    setVisible(false)

    if (!nextValue) {
      setValue(defaultValue)
      setChars(initialCharsState)
      return
    }
  }

  return (
    <Stack spacing={0}>
      <Text fontSize='sm' color={colors.brand.primary}>
        {label}
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
          onChange={(nextValue) => {
            setValue(nextValue)
            setChars(nextValue.length)
          }}
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
