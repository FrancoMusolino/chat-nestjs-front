import React, { useState } from 'react'
import { Avatar } from '@/shared/components/Avatar'
import { Box, Stack, Text } from '@chakra-ui/react'
import { BsCameraFill } from 'react-icons/bs'

import { useStoreSelector } from '@/shared/app/store'

export const ChangeProfilePicture = () => {
  const [isVisible, setIsVisible] = useState(false)

  const { profilePicture } = useStoreSelector('session')

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
    >
      <Box>
        <Avatar src={profilePicture} w='150px' h='150px' />
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
        visibility={isVisible ? 'visible' : 'hidden'}
        title='Selector de foto'
        role='button'
      >
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
      </Stack>
    </Box>
  )
}
