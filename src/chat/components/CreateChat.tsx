import React, { useRef } from 'react'
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
import { Button } from '@/shared/components/Button'

const initialValues = {
  title: '',
  description: '',
}

type ValuesType = typeof initialValues

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .max(35, 'Máximo 35 caractéres')
    .required('Campo requerido'),
  description: Yup.string().trim().max(255, 'Máximo 255 caractéres').optional(),
})

export const CreateChat = () => {
  const { onClose } = useModalContext()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log({ values })}
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
              fontSize='md'
              fontWeight={500}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type='submit'
              minW='200px'
              fontSize='md'
              fontWeight={500}
              isDisabled={Boolean(...(Object.values(errors) || !dirty))}
              onClick={onClose}
            >
              Crear Chat
            </Button>
          </HStack>
        </Form>
      )}
    </Formik>
  )
}
