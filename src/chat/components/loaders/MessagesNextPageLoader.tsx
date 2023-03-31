import React from 'react'
import { Box, Spinner } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { useBrandColors } from '@/shared/hooks'

export const MessagesNextPageLoader = () => {
  const { colors } = useBrandColors()

  return (
    <Box
      as={motion.div}
      initial={{ y: -50 }}
      animate={{ y: -16 }}
      exit={{ y: -50 }}
      position='absolute'
      w='30px'
      h='30px'
      p={1}
      alignSelf='center'
      textAlign='center'
      bgColor={colors.secondary}
      borderRadius='full'
    >
      <Spinner size='sm' color={colors['text-white']} />
    </Box>
  )
}
