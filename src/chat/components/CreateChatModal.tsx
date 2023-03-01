import React from 'react'
import { Input, MenuItem, ModalBody, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

import { Modal } from '@/shared/components/Modal'
import { Button } from '@/shared/components/Button'

const initialValues = {
  title: '',
  description: '',
}

type ValuesType = typeof initialValues

const validationSchema = Yup.object({
  title: Yup.string().trim().required('Campo requerido'),
  description: Yup.string().trim().optional(),
})

export const CreateChatModal = () => {
  return (
    <Modal
      trigger={MenuItem}
      triggerText='Nuevo Grupo'
      modalTitle='Crear Chat'
      cta={Button}
      ctaProps={{
        children: 'Crear Chat',
        minW: '200px',
        fontSize: 'md',
        fontWeight: 500,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => console.log('d')}
      >
        {({}) => (
          <Form>
            <ModalBody>
              <Stack w='full' spacing={5}>
                <Input placeholder='Título' />
                <Input
                  as='textarea'
                  resize='none'
                  h='140px'
                  placeholder='Descripción (opcional)'
                />
              </Stack>
            </ModalBody>
          </Form>
        )}
      </Formik>
    </Modal>
  )
}
