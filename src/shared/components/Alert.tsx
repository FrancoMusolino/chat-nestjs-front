import { useRef, FunctionComponent } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  ButtonProps,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'

import { useBrandTheme } from '../hooks'
import { Button } from './Button'

type AlertProps = {
  trigger: FunctionComponent<ButtonProps>
  triggerText: string
  alertTitle: string

  /**@default Aceptar */
  btnText?: string

  action?: () => void
}

export const Alert = ({
  trigger: Trigger,
  triggerText,
  alertTitle,
  btnText = 'Aceptar',
  action,
}: AlertProps) => {
  const { colors } = useBrandTheme()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<any>()

  return (
    <>
      <Trigger onClick={onOpen}>{triggerText}</Trigger>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            bgColor={colors.brand.secondary}
            borderRadius={15}
            alignSelf='center'
            userSelect='none'
          >
            <AlertDialogHeader
              fontSize='xl'
              fontWeight={500}
              textAlign='center'
            >
              {alertTitle}
            </AlertDialogHeader>

            <HStack w='full' as={AlertDialogFooter}>
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
                minW='200px'
                fontSize='md'
                fontWeight={500}
                onClick={
                  action
                    ? () => {
                        action()
                        onClose()
                      }
                    : onClose
                }
              >
                {btnText}
              </Button>
            </HStack>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
