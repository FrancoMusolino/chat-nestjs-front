import React, { ReactNode } from 'react'
import { FormikErrors } from 'formik'

import { Button } from '@/shared/components/Button'

type SubmitButtonProps = {
  children: ReactNode
  isLoading: boolean
  errors: FormikErrors<any>
  dirty: boolean
}

export const SubmitButton = ({
  children,
  isLoading,
  errors,
  dirty,
}: SubmitButtonProps) => {
  return (
    <Button
      type='submit'
      isDisabled={Boolean(...Object.values(errors)) || !dirty}
      isLoading={isLoading}
    >
      {children}
    </Button>
  )
}
