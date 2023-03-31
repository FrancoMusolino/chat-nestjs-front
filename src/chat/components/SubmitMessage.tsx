import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ResizeTextarea from 'react-textarea-autosize'
import { FaPaperPlane } from 'react-icons/fa'

import { useBrandColors, useErrorMessage } from '@/shared/hooks'
import { TextareaInputWithScroll } from '@/shared/components/TextareaInputWithScroll'
import { useSubmitMessageMutation } from '../services/message.service'

export const SubmitMessage = () => {
  const { colors } = useBrandColors()

  const { chatId } = useParams()

  const [content, setContent] = useState('')

  const { mutate: submitMessage, error } = useSubmitMessageMutation(chatId!)
  useErrorMessage(error)

  useEffect(() => {
    setContent('')
  }, [chatId])

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    const prevContent = content
    setContent('')

    return submitMessage(
      { content },
      {
        onError: () => {
          setContent(prevContent)
        },
      }
    )
  }

  return (
    <HStack
      as='form'
      px={7}
      py={2.5}
      gap={1}
      bgColor={colors.secondary}
      onSubmit={handleSubmit}
    >
      <TextareaInputWithScroll
        variant='filled'
        placeholder='Escibe un mensaje aquí'
        value={content}
        as={ResizeTextarea}
        flexGrow={1}
        minH='40px'
        maxH='150px'
        px={5}
        py={2.5}
        fontSize='15px'
        color={colors['text-white']}
        bgColor={colors.background}
        borderRadius={15}
        _hover={{
          bgColor: colors.background,
        }}
        _focus={{
          bgColor: colors.background,
        }}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        as={motion.button}
        whileTap={{ scale: 0.95 }}
        type='submit'
        title='Enviar mensaje'
        h='40px'
        alignSelf='flex-end'
        mb={`${1} !important`}
        bgColor='transparent'
        isDisabled={!content}
      >
        <FaPaperPlane size='20px' fill={colors['text-gray']} />
      </Button>
    </HStack>
  )
}
