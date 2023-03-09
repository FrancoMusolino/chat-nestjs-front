import React, { useState, useEffect } from 'react'
import { Box, Spinner, Stack, Text } from '@chakra-ui/react'
import { BsCameraFill } from 'react-icons/bs'

import { Avatar } from '@/shared/components/Avatar'
import { useGlobalDispatch, useStoreSelector } from '@/shared/app/store'
import { updateSession } from '@/shared/features/session/session.actions'
import { useUpdateUserMutation } from '@/shared/services/user.service'
import { useErrorMessage } from '@/shared/hooks'
import { CLOUDINARY_WIDGET_DEFAULT_OPTIONS } from '@/shared/constants'

let cloudinary: any
let widget: any

export const ChangeProfilePicture = () => {
  const [isVisible, setIsVisible] = useState(false)

  const { id, profilePicture } = useStoreSelector('session')
  const dispatch = useGlobalDispatch()

  const { mutate, error, isLoading } = useUpdateUserMutation(id)
  useErrorMessage(error)

  useEffect(() => {
    if (!cloudinary) {
      cloudinary = (window as any).cloudinary
    }

    const onIdle = () => {
      if (!widget) {
        widget = createWidget()
      }
    }

    const canIUseRIC = 'requestIdleCallback' in window

    const idleCallback = canIUseRIC
      ? requestIdleCallback(onIdle)
      : setTimeout(onIdle, 1)

    return () => {
      canIUseRIC
        ? cancelIdleCallback(idleCallback as number)
        : clearTimeout(idleCallback)
    }
  }, [])

  const createWidget = () => {
    const options = {
      ...CLOUDINARY_WIDGET_DEFAULT_OPTIONS,
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_USERS,
    }

    return cloudinary?.createUploadWidget(options, (error: any, res: any) => {
      if (res.event && res.event === 'success') {
        setIsVisible(false)
        const profilePicture = res.info.secure_url

        return mutate(
          { profilePicture },
          {
            onSuccess: () => {
              dispatch(updateSession({ profilePicture }))
            },
          }
        )
      }
    })
  }

  const open = () => {
    if (!widget) {
      widget = createWidget()
    }

    widget && widget.open()
  }

  return (
    <Box
      pos='relative'
      w='150px'
      h='150px'
      alignSelf='center'
      borderRadius='full'
      cursor='pointer'
      onClick={open}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <Box>
        {!isLoading && <Avatar src={profilePicture} w='150px' h='150px' />}
      </Box>
      <Stack
        pos='absolute'
        inset={0}
        w='full'
        h='full'
        align='center'
        justify='center'
        bgColor='rgba(50,50,50, .6)'
        borderRadius='inherit'
        visibility={isVisible || isLoading ? 'visible' : 'hidden'}
        title='Selector de foto'
        role='button'
      >
        {isLoading ? (
          <Spinner size='lg' />
        ) : (
          <>
            <BsCameraFill size='25px' />
            <Text
              as='span'
              fontSize='xs'
              textTransform='uppercase'
              letterSpacing={0.15}
              lineHeight={1.3}
              maxW='100px'
              textAlign='center'
            >
              Cambiar foto de perfil
            </Text>
          </>
        )}
      </Stack>
    </Box>
  )
}
