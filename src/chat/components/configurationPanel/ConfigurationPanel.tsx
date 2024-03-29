import React, { Dispatch, SetStateAction } from 'react'
import { Heading, HStack, Stack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'

import { Header } from '../Header'
import { useBrandColors } from '@/shared/hooks'
import { ProfileSettings } from './ProfileSettings'

type ConfigurationPanelProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ConfigurationPanel = ({ setIsOpen }: ConfigurationPanelProps) => {
  const { colors } = useBrandColors()

  return (
    <motion.div
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      exit={{ x: -500 }}
      transition={{ duration: 0.4 }}
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 1000,
        margin: 0,
        backgroundColor: colors.background,
      }}
    >
      <Stack h='full'>
        <Header>
          <HStack paddingLeft={6} spacing={6}>
            <FiArrowLeft
              cursor='pointer'
              size='24px'
              onClick={() => setIsOpen(false)}
            />
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
