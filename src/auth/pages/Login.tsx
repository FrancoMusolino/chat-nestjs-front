import React from 'react'
import { Stack } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { Presentation } from '../components/Presentation'
import { InputFloatingLabel } from '../components/InputFloatingLabel'
import { Question } from '../components/Question'
import { SubmitButton } from '../components/SubmitButton'

const initialValues = {
  username: '',
  password: '',
}

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Campo requerido'),
  password: Yup.string().trim().required('Campo requerido'),
})

export const Login = () => {
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
              title='Iniciar sesión'
              description='Ingresa a tu cuenta de CHAT APP'
            />

            <Stack spacing={6} w={286}>
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
                Ingresar
              </SubmitButton>
              <Question
                question='No tienes cuenta?'
                linkTxt='Regístrate'
                to='../registro'
              />
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
