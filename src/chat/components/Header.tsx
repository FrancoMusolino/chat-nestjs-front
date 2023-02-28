import React from 'react'
import { Heading, HStack } from '@chakra-ui/react'
import { FaEllipsisV } from 'react-icons/fa'

import { Avatar } from '@/shared/components/Avatar'
import { useStoreSelector } from '@/shared/app/store'
import { useBrandTheme } from '@/shared/hooks'

export const Header = () => {
  const { colors } = useBrandTheme()

  const { username, profilePicture } = useStoreSelector('session')

  return (
    <HStack
      as='header'
      h='75px'
      paddingBlock={4}
      paddingInline={3}
      justify='space-between'
      bgColor={colors.brand.secondary}
    >
      <HStack spacing={3}>
        <Avatar src={profilePicture} />
        <Heading fontSize='xl'>{username}</Heading>
      </HStack>
      <FaEllipsisV fill={colors.brand['text-gray']} cursor='pointer' />
    </HStack>
  )
}
