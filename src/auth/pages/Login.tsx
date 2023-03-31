import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { Presentation } from '../components/Presentation'
import { InputFloatingLabel } from '../components/InputFloatingLabel'
import { Question } from '../components/Question'
import { SubmitButton } from '../components/SubmitButton'

import { useGlobalDispatch } from '@/shared/app/store'
import { useErrorMessage } from '@/shared/hooks'
import { startSession } from '@/shared/features/session/session.actions'
import { AuthRequest, useLoginMutation } from '../services/auth.service'

const initialValues: AuthRequest = {
  username: '',
  password: '',
}

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Campo requerido'),
  password: Yup.string().trim().required('Campo requerido'),
})

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useGlobalDispatch()

  const { mutate, error, isLoading } = useLoginMutation()

  useErrorMessage(error)

  const handleSubmit = (values: AuthRequest) => {
    return mutate(values, {
      onSuccess: (user) => {
        const { id, username, token, profilePicture, status } = user
        dispatch(startSession({ id, username, token, profilePicture, status }))
        return navigate('/', { replace: true })
      },
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, dirty }) => (
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
              <SubmitButton isLoading={isLoading} dirty={dirty} errors={errors}>
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
