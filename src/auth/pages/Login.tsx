import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { Stack } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { Presentation } from '../components/Presentation'
import { InputFloatingLabel } from '../components/InputFloatingLabel'
import { Question } from '../components/Question'
import { SubmitButton } from '../components/SubmitButton'

import { useGlobalDispatch } from '@/shared/app/store'
import { axios } from '@/shared/services/axios'
import { useErrorMessage } from '@/shared/hooks'
import { LoginResponse } from '@/shared/types'
import { startSession } from '@/shared/features/session/session.actions'

const initialValues = {
  username: '',
  password: '',
}

type ValuesType = typeof initialValues

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Campo requerido'),
  password: Yup.string().trim().required('Campo requerido'),
})

const login = (user: ValuesType) =>
  axios.post<LoginResponse>('auth/login', user)

export const Login = () => {
  const navigate = useNavigate()
  const dispatch = useGlobalDispatch()

  const { mutate, error, isLoading } = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  })

  useErrorMessage(error)

  const handleSubmit = (values: ValuesType) => {
    return mutate(values, {
      onSuccess: (user) => {
        const { id, username, token } = user.data
        dispatch(startSession({ id, username, token }))
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
