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
import { useBrandTheme } from '@/shared/hooks'

const initialValues = {
  password: '',
}

const validationSchema = Yup.object({
  password: Yup.string().trim().required('Campo requerido'),
})

export const DeleteAccount = () => {
  const { colors } = useBrandTheme()
  const { onClose } = useModalContext()

  const handleSubmit = () => {
    console.log('hola')
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
              icon={<FaLock fill={colors.brand['text-gray']} size='15px' />}
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
              btnType='danger'
              minW='200px'
              fontSize='md'
              fontWeight={500}
              // isLoading={isLoading}
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
