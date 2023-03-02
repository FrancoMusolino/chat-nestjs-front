import React, { HTMLInputTypeAttribute } from 'react'
import { FormControl, Input } from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

import { FormErrorMsg } from '@/shared/components/FormErrorMsg'

type OutlineInputProps = {
  name: string
  placeholder: string

  /**@default text */
  type?: HTMLInputTypeAttribute
}

export const OutlineInput = ({
  name,
  placeholder,
  type = 'text',
}: OutlineInputProps) => {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors } }: FieldProps) => (
        <FormControl
          h='65px'
          isInvalid={Boolean(errors[name] && touched[name])}
        >
          <Input
            variant='unstyled'
            type={type}
            placeholder={placeholder}
            w='full'
            {...field}
          />
          <FormErrorMsg>{String(errors[name])}</FormErrorMsg>
        </FormControl>
      )}
    </Field>
  )
}
