import { useRef, FunctionComponent, ReactNode } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'

import { useBrandTheme } from '../hooks'
import { Button, ButtonProps } from './Button'

type AlertProps = {
  trigger: FunctionComponent<ButtonProps>
  triggerText: string
  triggerProps?: Omit<ButtonProps, 'children'>
  alertTitle: ReactNode

  /**@default Aceptar */
  btnText?: string

  btnProps?: Omit<ButtonProps, 'children'>

  action?: () => void
} & Partial<AlertDialogProps>

export const Alert = ({
  trigger: Trigger,
  triggerText,
  triggerProps,
  alertTitle,
  btnText = 'Aceptar',
  btnProps,
  action,
  ...props
}: AlertProps) => {
  const { colors } = useBrandTheme()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef<any>()

  return (
    <>
      <Trigger {...triggerProps} onClick={onOpen}>
        {triggerText}
      </Trigger>

      <AlertDialog
        {...props}
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
                fontSize='15px'
                fontWeight={500}
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button
                minW='200px'
                fontSize='15px'
                fontWeight={500}
                onClick={
                  action
                    ? () => {
                        action()
                        onClose()
                      }
                    : onClose
                }
                {...btnProps}
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
