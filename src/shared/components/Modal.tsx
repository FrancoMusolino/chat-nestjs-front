import { FunctionComponent, ReactNode } from 'react'
import {
  HStack,
  Modal as ChakraModal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { IoCloseCircleOutline } from 'react-icons/io5'

import { useBrandColors } from '../hooks'
import { ButtonProps } from './Button'

type ModalProps = {
  children: ReactNode
  trigger: FunctionComponent<ButtonProps>
  triggerText: string
  triggerProps?: ButtonProps
  modalTitle: string
}

export const Modal = ({
  children,
  trigger: Trigger,
  triggerProps,
  triggerText,
  modalTitle,
}: ModalProps) => {
  const { colors } = useBrandColors()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Trigger {...triggerProps} onClick={onOpen}>
        {triggerText}
      </Trigger>

      <ChakraModal
        isOpen={isOpen}
        onClose={onClose}
        autoFocus={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
          bgColor={colors.secondary}
          borderRadius={15}
          userSelect='none'
        >
          <HStack as={ModalHeader} align='flex-start' justify='space-between'>
            <Text fontWeight={500}>{modalTitle}</Text>
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
