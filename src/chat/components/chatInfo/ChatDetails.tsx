import React from 'react'
import { SkeletonText, Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { useGetChat } from '../../services/chat.service'
import { useBrandColors } from '@/shared/hooks'
import { DateTime } from '@/shared/helpers'

export const ChatDetails = () => {
  const { colors } = useBrandColors()

  const { chatId } = useParams()

  const { data, isLoading } = useGetChat(chatId!)
  const chat = data?.data

  return (
    <Stack px={6}>
      <SkeletonText noOfLines={1} skeletonHeight='4' isLoaded={!isLoading}>
        {chat?.description ? (
          <Text wordBreak='break-all' fontSize='sm'>
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
      <SkeletonText noOfLines={1} skeletonHeight='4' isLoaded={!isLoading}>
        <Text fontSize='sm' color={colors['text-gray']}>
          Grupo creado por {chat?.createdBy} el{' '}
          {data &&
            DateTime.createFromDate(chat!.createdAt).formatDate({
              dateStyle: 'short',
              timeStyle: 'short',
            })}
        </Text>
      </SkeletonText>
    </Stack>
  )
}
