import React, { ReactNode } from 'react'
import {
  IconButton,
  Menu as ChakraMenu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'
import { FaEllipsisV } from 'react-icons/fa'
import { useBrandTheme } from '../hooks'

type MenuProps = {
  children: ReactNode
}

export const Menu = ({ children }: MenuProps) => {
  const { colors } = useBrandTheme()

  return (
    <ChakraMenu gutter={4} placement='bottom-end'>
      <MenuButton
        as={IconButton}
        icon={<FaEllipsisV fill={colors.brand['text-gray']} />}
        borderRadius='full'
        bgColor='transparent'
        _hover={{
          bgColor: 'initial',
        }}
        _active={{
          bgColor: 'rgba(255,255,255,0.1)',
        }}
        title='menú'
      />
      <MenuList>{children}</MenuList>
    </ChakraMenu>
  )
}
