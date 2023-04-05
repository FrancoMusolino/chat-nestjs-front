import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FaArrowDown } from 'react-icons/fa'

import { useBrandColors } from '@/shared/hooks'

type ScrollToBottomButtonProps = BoxProps

export const ScrollToBottomButton = ({
  children,
  ...props
}: ScrollToBottomButtonProps) => {
  const { colors } = useBrandColors()

  return (
    <motion.div
      initial={{ bottom: -30 }}
      animate={{ bottom: 60 }}
      exit={{ bottom: -30 }}
      style={{ position: 'absolute', right: 50 }}
    >
      <Box
        as={motion.div}
        position='fixed'
        display='flex'
        alignItems='center'
        justifyContent='center'
        w='30px'
        h='30px'
        p={1}
        bgColor={colors.secondary}
        borderRadius='full'
        cursor='pointer'
        userSelect='none'
        {...props}
      >
        <FaArrowDown fontSize='18px' color={colors['text-white']} />
        {children}
      </Box>
    </motion.div>
  )
}
