import React, { useState } from 'react'
import { Box, BoxProps, Spinner, Stack, Text } from '@chakra-ui/react'
import { BsCameraFill } from 'react-icons/bs'

import { Avatar, AvatarProps } from '@/shared/components/Avatar'

type EditablePicturePicture = {
  boxProps?: BoxProps
  avatarProps?: AvatarProps
  text: string

  /**@default false */
  isLoading?: boolean
}

export const EditablePicture = ({
  boxProps,
  avatarProps,
  text,
  isLoading = false,
}: EditablePicturePicture) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Box
      pos='relative'
      w='150px'
      h='150px'
      alignSelf='center'
      borderRadius='full'
      cursor='pointer'
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...boxProps}
    >
      {!isLoading && <Avatar {...avatarProps} />}
      <Stack
        pos='absolute'
        inset={0}
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
              {text}
            </Text>
          </>
        )}
      </Stack>
    </Box>
  )
}
