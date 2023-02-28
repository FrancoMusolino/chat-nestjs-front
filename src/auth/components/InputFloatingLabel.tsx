import React, { HTMLInputTypeAttribute } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

import { useBrandTheme } from '@/shared/hooks'

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
  const { colors } = useBrandTheme()

  return (
    <Field name={name}>
      {({ field, form: { errors, touched } }: FieldProps) => (
        <FormControl
          variant='floating'
          id={label.toLowerCase()}
          isInvalid={Boolean(errors[name] && touched[name])}
          h='60px'
        >
          <Input type={type} placeholder=' ' {...field} />
          <FormLabel>{label}</FormLabel>
          <FormErrorMessage fontSize='xs' color={colors.brand.danger}>
            {String(errors[name])}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}
