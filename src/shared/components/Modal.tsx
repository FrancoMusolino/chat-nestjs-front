import { FunctionComponent, ReactNode } from 'react'
import { useFormikContext } from 'formik'
import {
  ButtonProps as ChakraButtonProps,
  HStack,
  Modal as ChakraModal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { IoCloseCircleOutline } from 'react-icons/io5'

import { useBrandTheme } from '../hooks'
import { Button, ButtonProps } from './Button'

type ModalProps = {
  children: ReactNode
  trigger: FunctionComponent<ChakraButtonProps>

  triggerText: string
  modalTitle: string
}

export const Modal = ({
  children,
  trigger: Trigger,
  triggerText,
  modalTitle,
}: ModalProps) => {
  const { colors } = useBrandTheme()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Trigger onClick={onOpen}>{triggerText}</Trigger>

      <ChakraModal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bgColor={colors.brand.secondary}
          borderRadius={15}
          userSelect='none'
        >
          <HStack as={ModalHeader} align='center' justify='space-between'>
            <Text fontWeight={400}>{modalTitle}</Text>
            <IoCloseCircleOutline
              fontSize={24}
              cursor='pointer'
              onClick={onClose}
            />
          </HStack>

          {children}
        </ModalContent>
      </ChakraModal>
    </>
  )
}
