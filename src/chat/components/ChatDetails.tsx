import React from 'react'
import { Heading, HStack, SkeletonText, Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { ChatDangerActions } from './ChatDangerActions'
import { useSelectedChat } from '../hooks/useSelectedChat'
import { Avatar } from '@/shared/components/Avatar'
import { useBrandColors } from '@/shared/hooks'
import { useGetChat } from '../services/chat.service'
import { useStoreSelector } from '@/shared/app/store'
import { DateTime } from '@/shared/helpers'

export const ChatDetails = () => {
  const { colors } = useBrandColors()

  const { chatId } = useParams()

  const { username } = useStoreSelector('session')

  const { data, isLoading } = useGetChat(chatId!)
  const chat = data?.data

  const { selectedChat } = useSelectedChat(chatId!)

  return (
    <HStack
      py={10}
      px={16}
      spacing={14}
      borderBottom={`15px solid ${colors.secondary}`}
    >
      <Stack spacing={4}>
        <Avatar src={selectedChat?.avatar} boxSize='170px' isGroupPicture />
        <Stack spacing={0} align='center' textAlign='center' maxW='170px'>
          <Heading fontSize='xl' wordBreak='break-all'>
            {selectedChat?.title}
          </Heading>
          <Text fontSize='sm' color={colors['text-gray']}>
            Grupo -{' '}
            {isLoading
              ? 'Cargando...'
              : chat!.userIDs.length > 1
              ? `${chat?.userIDs.length} participantes`
              : '1 participante'}
          </Text>
        </Stack>
      </Stack>
      <Stack
        h='210px'
        flexGrow={1}
        alignSelf='flex-end'
        justify='space-between'
      >
        <Stack>
          <SkeletonText noOfLines={1} skeletonHeight='4' isLoaded={!isLoading}>
            {chat?.description ? (
              <Text
                wordBreak='break-all'
                fontSize='sm'
                color={colors['text-gray']}
              >
                {chat.description}
              </Text>
            ) : (
              <Text
                fontSize='sm'
                fontWeight={700}
                color={colors.primary}
                cursor='pointer'
                _hover={{ textDecor: 'underline' }}
              >
                Añade una descripción del grupo
              </Text>
            )}
          </SkeletonText>
          <SkeletonText
            noOfLines={1}
            skeletonHeight='4'
            w='60%'
            isLoaded={!isLoading}
          >
            <Text fontSize='sm'>
              Grupo creado por {chat?.createdBy} el{' '}
              {data &&
                DateTime.createFromDate(chat!.createdAt).formatDate({
                  dateStyle: 'short',
                  timeStyle: 'short',
                })}
            </Text>
          </SkeletonText>
        </Stack>
        <ChatDangerActions showDeleteChatBtn={username === chat?.createdBy} />
      </Stack>
    </HStack>
  )
}
