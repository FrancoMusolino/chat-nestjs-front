import React, { ReactNode } from 'react'
import {
  IconButton,
  Menu as ChakraMenu,
  MenuProps as ChakraMenuProps,
  MenuButton,
  MenuButtonProps,
  MenuList,
} from '@chakra-ui/react'
import { FaEllipsisV } from 'react-icons/fa'
import { IconType } from 'react-icons/lib'

import { useBrandColors } from '../hooks'

type MenuProps = {
  children: ReactNode
  icon?: IconType
  menuButtonStyle?: MenuButtonProps
  menuProps?: Omit<ChakraMenuProps, 'children'>
}

export const Menu = ({
  children,
  icon: Icon,
  menuButtonStyle,
  menuProps,
}: MenuProps) => {
  const { colors } = useBrandColors()

  return (
    <ChakraMenu
      gutter={4}
      placement='bottom-end'
      autoSelect={false}
      {...menuProps}
    >
      <MenuButton
        as={IconButton}
        icon={
          Icon ? (
            <Icon fill={colors['text-gray']} cursor='pointer' />
          ) : (
            <FaEllipsisV fill={colors['text-gray']} />
          )
        }
        borderRadius='full'
        bgColor='transparent'
        _hover={{
          bgColor: 'initial',
        }}
        _active={{
          bgColor: 'rgba(255,255,255,0.1)',
        }}
        title='menú'
        {...menuButtonStyle}
      />
      <MenuList>{children}</MenuList>
    </ChakraMenu>
  )
}
