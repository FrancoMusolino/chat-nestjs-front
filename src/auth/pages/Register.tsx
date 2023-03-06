import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { Presentation } from '../components/Presentation'
import { InputFloatingLabel } from '../components/InputFloatingLabel'
import { Question } from '../components/Question'
import { SubmitButton } from '../components/SubmitButton'
import { AuthRequest, useRegisterMutation } from '../services/auth.service'

import { ERROR_MESSAGES, PASSWORD_REGEXP } from '@/shared/constants'
import { useErrorMessage } from '@/shared/hooks'
import { useGlobalDispatch } from '@/shared/app/store'
import { startSession } from '@/shared/features/session/session.actions'

const initialValues: AuthRequest = {
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
  const navigate = useNavigate()
  const dispatch = useGlobalDispatch()

  const { mutate, error, isLoading } = useRegisterMutation()

  useErrorMessage(error)

  const handleSubmit = (values: AuthRequest) => {
    return mutate(values, {
      onSuccess: (newUser) => {
        const { id, username, token, status } = newUser.data
        dispatch(startSession({ id, username, token, status }))
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
              title='Crea tu cuenta'
              description='Crea una cuenta en CHAT APP'
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
