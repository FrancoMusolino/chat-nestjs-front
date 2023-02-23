import React, { HTMLInputTypeAttribute } from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useTheme,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

import { BrandTheme } from '@/theme'

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
  const { colors } = useTheme<BrandTheme>()

  return (
    <Field name={name}>
      {({ field, form: { errors, touched } }: FieldProps) => (
        <FormControl
          variant='floating'
          id={label.toLowerCase()}
          isInvalid={Boolean(errors[name] && touched[name])}
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
