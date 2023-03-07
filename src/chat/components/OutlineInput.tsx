import React, { HTMLInputTypeAttribute, ReactNode } from 'react'
import {
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { Field, FieldProps } from 'formik'

import { FormErrorMsg } from '@/shared/components/FormErrorMsg'

type OutlineInputProps = {
  name: string
  placeholder: string

  /**@default text */
  type?: HTMLInputTypeAttribute

  /**@default false */
  withIcon?: boolean

  icon?: ReactNode
}

export const OutlineInput = ({
  name,
  placeholder,
  type = 'text',
  withIcon = false,
  icon,
}: OutlineInputProps) => {
  return (
    <Field name={name}>
      {({ field, form: { touched, errors } }: FieldProps) => (
        <FormControl
          h='65px'
          isInvalid={Boolean(errors[name] && touched[name])}
        >
          <InputGroup>
            {withIcon && <InputLeftElement pb={1}>{icon}</InputLeftElement>}
            <Input
              variant='unstyled'
              type={type}
              placeholder={placeholder}
              pl={withIcon ? 9 : 4}
              w='full'
              {...field}
            />
          </InputGroup>
          <FormErrorMsg>{String(errors[name])}</FormErrorMsg>
        </FormControl>
      )}
    </Field>
  )
}
