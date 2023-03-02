import React, { HTMLInputTypeAttribute } from 'react'
import { FormControl, FormLabel, Input } from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

import { FormErrorMsg } from '@/shared/components/FormErrorMsg'

type InputFloatingLabelProps = {
  name: string
  label: string

  /**@default text */
  type?: HTMLInputTypeAttribute
}

export const InputFloatingLabel = ({
  name,
  label,
  type = 'text',
}: InputFloatingLabelProps) => {
  return (
    <Field name={name}>
      {({ field, form: { errors, touched } }: FieldProps) => (
        <FormControl
          variant='floating'
          id={label.toLowerCase()}
          isInvalid={Boolean(errors[name] && touched[name])}
          h='60px'
        >
          <Input w='full' type={type} placeholder=' ' {...field} />
          <FormLabel>{label}</FormLabel>
          <FormErrorMsg>{String(errors[name])}</FormErrorMsg>
        </FormControl>
      )}
    </Field>
  )
}
