import React, { useState, useEffect } from 'react'
import {
  Editable,
  EditableInput,
  EditablePreview,
  EditableProps,
  EditableTextarea,
  HStack,
} from '@chakra-ui/react'

import { useBrandColors } from '@/shared/hooks'

type EditableFielProps = { inputMaxLength: number } & EditableProps

export const EditableField = ({
  inputMaxLength,
  value: initialValue,
  ...props
}: EditableFielProps) => {
  const { colors } = useBrandColors()

  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <Editable value={value} {...props}>
      <HStack pos='relative'>
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
          onChange={(e) => setValue(e.target.value)}
        />
      </HStack>
    </Editable>
  )
}
