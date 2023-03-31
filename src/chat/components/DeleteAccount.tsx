import React from 'react'
import {
  HStack,
  ModalBody,
  ModalFooter,
  Stack,
  useModalContext,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FaLock } from 'react-icons/fa'

import { OutlineInput } from './OutlineInput'

import { Button } from '@/shared/components/Button'
import { useBrandColors, useErrorMessage } from '@/shared/hooks'
import {
  DeleteAccountRequest,
  useDeleteAccountMutation,
} from '@/shared/services/user.service'
import { useGlobalDispatch, useStoreSelector } from '@/shared/app/store'
import { endSession } from '@/shared/features/session/session.actions'

const initialValues: DeleteAccountRequest = {
  password: '',
}

const validationSchema = Yup.object({
  password: Yup.string().trim().required('Campo requerido'),
})

export const DeleteAccount = () => {
  const { colors } = useBrandColors()
  const { onClose } = useModalContext()

  const { id } = useStoreSelector('session')
  const dispatch = useGlobalDispatch()

  const {
    mutate: deleteAccount,
    isLoading,
    error,
  } = useDeleteAccountMutation(id)
  useErrorMessage(error)

  const handleSubmit = (data: DeleteAccountRequest) => {
    return deleteAccount(data, {
      onSuccess: () => {
        dispatch(endSession())
        onClose()
      },
    })
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ dirty, errors }) => (
        <Form>
          <Stack as={ModalBody} w='full' spacing={2}>
            <OutlineInput
              name='password'
              type='password'
              placeholder='Para confirmar, ingrese su contraseña'
              withIcon
              icon={<FaLock fill={colors['text-gray']} size='15px' />}
            />
          </Stack>

          <HStack as={ModalFooter} w='full' pt={0}>
            <Button
              btnType='cancel'
              minW='200px'
              fontSize='sm'
              fontWeight={500}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              btnType='danger'
              minW='200px'
              fontSize='sm'
              fontWeight={500}
              isLoading={isLoading}
              isDisabled={Boolean(...(Object.values(errors) || !dirty))}
            >
              Eliminar cuenta
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  )
}
