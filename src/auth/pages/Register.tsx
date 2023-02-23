import React from 'react'
import { Stack } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { Presentation } from '../components/Presentation'
import { InputFloatingLabel } from '../components/InputFloatingLabel'
import { Question } from '../components/Question'
import { SubmitButton } from '../components/SubmitButton'
import { ERROR_MESSAGES, PASSWORD_REGEXP } from '@/shared/constants'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .min(3, 'Mínimo 3 caracteres')
    .max(15, 'Máximo 15 caracteres')
    .required('Campo requerido'),
  password: Yup.string()
    .trim()
    .matches(PASSWORD_REGEXP, ERROR_MESSAGES.INVALID_PASSWORD)
    .required('Campo requerido'),
})

export const Register = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log({ values })
        setSubmitting(false)
      }}
    >
      {({ isSubmitting, errors, dirty }) => (
        <Form>
          <Stack h='100vh' justify='center' align='center' spacing={12}>
            <Presentation
              title='Crea tu cuenta'
              description='Crea una cuenta en CHAT APP'
            />

            <Stack spacing={10} w={286}>
              <InputFloatingLabel name='username' label='Username' />
              <InputFloatingLabel
                name='password'
                label='Contraseña'
                type='password'
              />
            </Stack>

            <Stack spacing={5}>
              <SubmitButton
                isLoading={isSubmitting}
                dirty={dirty}
                errors={errors}
              >
                Crear
              </SubmitButton>
              <Question
                question='Ya tienes cuenta?'
                linkTxt='Iniciar sesión'
                to='../login'
              />
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
