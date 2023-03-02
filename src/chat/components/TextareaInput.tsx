import React from 'react'
import { FormControl } from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

import { FormErrorMsg } from '@/shared/components/FormErrorMsg'
import { TextareaInputWithScroll } from '@/shared/components/TextareaInputWithScroll'

type TextareaInputProps = {
  name: string
  placeholder: string
}

export const TextareaInput = ({ name, placeholder }: TextareaInputProps) => {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors } }: FieldProps) => (
        <FormControl isInvalid={Boolean(errors[name] && touched[name])}>
          <TextareaInputWithScroll
            as='textarea'
            w='full'
            h='140px'
            placeholder={placeholder}
            {...field}
          />
          <FormErrorMsg>{String(errors[name])}</FormErrorMsg>
        </FormControl>
      )}
    </Field>
  )
}
