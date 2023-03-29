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

import { OutlineInput } from './OutlineInput'
import { TextareaInput } from './TextareaInput'
import {
  CreateChatRequest,
  useCreateChatMutation,
} from '../services/chat.service'

import { Button } from '@/shared/components/Button'
import { useErrorMessage } from '@/shared/hooks'

const initialValues: CreateChatRequest = {
  title: '',
  description: '',
}

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .max(35, 'Máximo 35 caractéres')
    .required('Campo requerido'),
  description: Yup.string().trim().optional(),
})

export const CreateChat = () => {
  const { onClose } = useModalContext()

  const { mutate: createChat, isLoading, error } = useCreateChatMutation()
  useErrorMessage(error)

  const handleSubmit = (newChat: CreateChatRequest) => {
    return createChat(newChat, {
      onSuccess: () => {
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
            <OutlineInput name='title' placeholder='Título' />
            <TextareaInput
              name='description'
              placeholder='Descripción (opcional)'
            />
          </Stack>

          <HStack as={ModalFooter} w='full'>
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
              minW='200px'
              fontSize='sm'
              fontWeight={500}
              isLoading={isLoading}
              isDisabled={Boolean(...(Object.values(errors) || !dirty))}
            >
              Crear Chat
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  )
}
