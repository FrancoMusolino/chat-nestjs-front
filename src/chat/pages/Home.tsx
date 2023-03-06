import React from 'react'
import { Heading, Image, Stack, Text } from '@chakra-ui/react'

import { Header } from '../components/Header'

import { useBrandTheme } from '@/shared/hooks'

export const Home = () => {
  const { colors } = useBrandTheme()

  return (
    <Stack h='full' borderBottom={`8px solid ${colors.brand.primary}`}>
      <Header />
      <Stack flexGrow={1} justify='center' align='center'>
        <Image
          ml={10}
          boxSize='200px'
          src='https://res.cloudinary.com/francomuso/image/upload/v1678114882/chat/chat_presentation.webp'
          alt='Chat App'
        />
        <Heading as='h1' fontSize='5xl' fontWeight={500} lineHeight={1}>
          Chat App
        </Heading>
        <Text w='370px' textAlign='center'>
          Envía y recibe mensajes en tiempo real a través de Chat App. ¡Qué
          esperas!
        </Text>
      </Stack>
    </Stack>
  )
}
