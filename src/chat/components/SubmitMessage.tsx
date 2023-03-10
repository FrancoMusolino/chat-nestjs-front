import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button, HStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import ResizeTextarea from 'react-textarea-autosize'
import { FaPaperPlane } from 'react-icons/fa'

import { useBrandTheme } from '@/shared/hooks'
import { TextareaInputWithScroll } from '@/shared/components/TextareaInputWithScroll'

export const SubmitMessage = () => {
  const {
    colors: { brand },
  } = useBrandTheme()

  const { chatId } = useParams()

  useEffect(() => {
    setContent('')
  }, [chatId])

  const [content, setContent] = useState('')

  return (
    <HStack
      as='form'
      minH='70px'
      px={7}
      py={2.5}
      gap={1}
      bgColor={brand.secondary}
      onSubmit={(e) => e.preventDefault()}
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
        color={brand['text-white']}
        bgColor={brand.background}
        borderRadius={15}
        _hover={{
          bgColor: brand.background,
        }}
        _focus={{
          bgColor: brand.background,
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
      >
        <FaPaperPlane size='20px' fill={brand['text-gray']} />
      </Button>
    </HStack>
  )
}
