import React from 'react'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

import { Header } from '../Header'
import { useBrandTheme } from '@/shared/hooks'
import { ProfileSettings } from './ProfileSettings'

export const ConfigurationPanel = () => {
  const { colors } = useBrandTheme()

  return (
    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      exit={{ x: -500 }}
      transition={{ duration: 0.5 }}
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 1000,
        margin: 0,
        backgroundColor: colors.brand.background,
      }}
    >
      <Stack h='full'>
        <Header paddingLeft={`${8} !important`}>
          <HStack spacing={6}>
            <FiArrowLeft cursor='pointer' size='24px' />
            <Heading fontWeight={500} fontSize='xl' userSelect='none'>
              Perfil
            </Heading>
          </HStack>
        </Header>
        <ProfileSettings />
      </Stack>
    </motion.div>
  )
}
