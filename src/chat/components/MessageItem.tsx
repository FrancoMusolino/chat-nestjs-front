import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, HStack, Link, MenuItem, Stack, Text } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Linkify from 'react-linkify'
import { BsChevronDown } from 'react-icons/bs'
import { TiCancel } from 'react-icons/ti'

import { Avatar } from '@/shared/components/Avatar'
import { useBrandColors, useErrorMessage } from '@/shared/hooks'
import { Menu } from '@/shared/components/Menu'
import { useDeleteMessageMutation } from '../services/message.service'

type MessageItemProps = {
  isConsecutive: boolean
  isSender: boolean

  id: string
  content: string
  deleted: boolean
  sender: string
  senderAvatar?: string
  time: string
}

export const MessageItem = ({
  id,
  content,
  deleted,
  sender,
  senderAvatar,
  time,
  isConsecutive,
  isSender,
}: MessageItemProps) => {
  const { colors } = useBrandColors()

  const { chatId } = useParams()

  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const { mutate: deleteMessage, error } = useDeleteMessageMutation(chatId!, id)
  useErrorMessage(error)

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
        bgColor={isSender ? colors.primary : colors.secondary}
        borderRadius={10}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => !isOpen && setIsVisible(false)}
      >
        {!isSender && !isConsecutive && (
          <Text
            alignSelf='flex-start'
            fontSize='sm'
            color={colors['text-gray']}
          >
            {sender}
          </Text>
        )}
        <HStack pos='relative'>
          <Linkify
            componentDecorator={(decoratedText: string) => (
              <Link
                key={Math.random() * 1000}
                color={colors.link}
                _hover={{ textDecor: 'underline' }}
                target='blank'
                rel='noreferrer noopener'
                href={decoratedText}
              >
                {decoratedText}
              </Link>
            )}
          >
            {deleted ? (
              <HStack spacing={0}>
                <TiCancel fill={colors['text-gray']} size='20px' />
                <i style={{ color: colors['text-gray'] }}>{content}</i>
              </HStack>
            ) : (
              <Text
                fontSize='15px'
                whiteSpace='pre-wrap'
                wordBreak='break-word'
              >
                {content}
              </Text>
            )}
          </Linkify>
          <Text
            alignSelf='flex-end'
            fontSize='11px'
            color={colors['text-gray']}
          >
            {time}
          </Text>
          <AnimatePresence>
            {isVisible && isSender && !deleted && (
              <Stack
                as={motion.div}
                pos='absolute'
                top={0}
                animate={{ right: -1 }}
                initial={{ right: -5 }}
                justify='center'
                p={1}
                pr={0}
                bgColor={colors.primary}
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
                  <MenuItem onClick={() => deleteMessage()}>
                    Eliminar Mensaje
                  </MenuItem>
                </Menu>
              </Stack>
            )}
          </AnimatePresence>
        </HStack>
      </Stack>
    </HStack>
  )
}
