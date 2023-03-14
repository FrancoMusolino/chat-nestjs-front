import React, { useState } from 'react'
import { Box, HStack, MenuItem, Stack, Text } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { BsChevronDown } from 'react-icons/bs'

import { Avatar } from '@/shared/components/Avatar'
import { useBrandTheme } from '@/shared/hooks'
import { Menu } from '@/shared/components/Menu'

type MessageItemProps = {
  isConsecutive: boolean
  isSender: boolean

  content: string
  sender: string
  senderAvatar?: string
  time: string
}

export const MessageItem = ({
  isConsecutive,
  isSender,
  content,
  sender,
  time,
  senderAvatar,
}: MessageItemProps) => {
  const {
    colors: { brand },
  } = useBrandTheme()

  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <HStack
      justify={isSender ? 'flex-end' : 'flex-start'}
      align='flex-start'
      spacing={0}
      gap={2}
    >
      <Box w='30px' order={isSender ? 2 : 1}>
        {!isConsecutive && <Avatar src={senderAvatar} boxSize='30px' />}
      </Box>
      <Stack
        maxW='65%'
        order={isSender ? 1 : 2}
        spacing={0}
        px={2.5}
        py={1}
        bgColor={isSender ? brand.primary : brand.secondary}
        borderRadius={10}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => !isOpen && setIsVisible(false)}
      >
        {!isSender && !isConsecutive && (
          <Text alignSelf='flex-start' fontSize='sm' color={brand['text-gray']}>
            {sender}
          </Text>
        )}
        <HStack pos='relative'>
          <Text fontSize='15px'>{content}</Text>
          <Text alignSelf='flex-end' fontSize='11px' color={brand['text-gray']}>
            {time}
          </Text>
          <AnimatePresence>
            {isVisible && isSender && (
              <Stack
                as={motion.div}
                pos='absolute'
                top={0}
                animate={{ right: -1 }}
                initial={{ right: -5 }}
                justify='center'
                p={1}
                pr={0}
                bgColor={brand.primary}
              >
                <Menu
                  menuProps={{
                    placement: 'top-end',
                    gutter: 1,
                    computePositionOnMount: true,
                    onClose: () => {
                      setIsOpen(false)
                      setIsVisible(false)
                    },
                  }}
                  icon={BsChevronDown}
                  menuButtonStyle={{
                    minW: 'min-content',
                    h: 'auto',
                    _active: {
                      bgColor: 'initial',
                    },
                    onClick: () => setIsOpen(true),
                  }}
                >
                  <MenuItem>Eliminar Mensaje</MenuItem>
                </Menu>
              </Stack>
            )}
          </AnimatePresence>
        </HStack>
      </Stack>
    </HStack>
  )
}
