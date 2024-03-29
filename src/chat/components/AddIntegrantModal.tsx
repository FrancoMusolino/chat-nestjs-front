import React from 'react'
import { useParams } from 'react-router-dom'
import {
  HStack,
  ModalBody,
  ModalFooter,
  Stack,
  useModalContext,
  useToast,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { AiOutlineUserAdd } from 'react-icons/ai'

import { OutlineInput } from './OutlineInput'
import {
  AddIntegrantRequest,
  useAddIntegrantMutation,
} from '../services/chat.service'
import { Button } from '@/shared/components/Button'
import { useBrandColors, useErrorMessage } from '@/shared/hooks'
import { socket } from '@/shared/app/socket'
import { SOCKET_EVENTS } from '@/shared/enums'

const initialValues: AddIntegrantRequest = {
  username: '',
}

const validationSchema = Yup.object({
  username: Yup.string().trim().required('Campo requerido'),
})

export const AddIntegrantModal = () => {
  const { colors } = useBrandColors()

  const toast = useToast()
  const { onClose } = useModalContext()

  const { chatId } = useParams()

  const {
    mutate: addIntegrant,
    error,
    isLoading,
  } = useAddIntegrantMutation(chatId!)
  useErrorMessage(error)

  const handleSubmit = (newIntegrant: AddIntegrantRequest) => {
    return addIntegrant(newIntegrant, {
      onSuccess: () => {
        const { username } = newIntegrant

        socket.emit(SOCKET_EVENTS.EVENT_ADD_INTEGRANT, {
          username,
          chatId,
        })

        toast({
          status: 'success',
          title: `Usuario ${username} agregado al chat`,
        })

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
              name='username'
              placeholder='Ingrese el username'
              withIcon
              icon={<AiOutlineUserAdd fill={colors['text-gray']} size='20px' />}
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
              btnType='primary'
              minW='200px'
              fontSize='sm'
              fontWeight={500}
              isLoading={isLoading}
              isDisabled={Boolean(...(Object.values(errors) || !dirty))}
            >
              Agregar
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  )
}
