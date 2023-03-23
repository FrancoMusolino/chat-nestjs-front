import React from 'react'
import { Heading, HStack, Stack, StackDivider } from '@chakra-ui/react'
import { Variants, motion } from 'framer-motion'
import { RxCross1 } from 'react-icons/rx'

import { Header } from '../Header'
import { ChatPresentation } from './ChatPresentation'
import { ChatDetails } from './ChatDetails'
import { ChatIntegrants } from './ChatIntegrants'
import { ChatDangerActions } from './ChatDangerActions'
import { ChatLayout } from '../../layout/ChatLayout'

import { useGlobalDispatch, useStoreSelector } from '@/shared/app/store'
import { changeInfoPanelVisibility } from '@/shared/features/chat/chat.actions'
import { useBrandColors } from '@/shared/hooks'
import { SectionWithScroll } from '@/shared/components/SectionWithScroll'

const headerVariants: Variants = {
  open: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, x: 20, transition: { duration: 0.1 } },
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.1 } },
}

export const ChatInfo = () => {
  const { colors } = useBrandColors()

  const { infoPanelIsVisible } = useStoreSelector('chat')
  const dispatch = useGlobalDispatch()

  return (
    <ChatLayout borderLeft={`1px solid ${colors.secondary}`}>
      <motion.div
        animate={infoPanelIsVisible ? 'open' : 'closed'}
        variants={headerVariants}
      >
        <Header minH='75px'>
          <HStack paddingLeft={6} spacing={6}>
            <RxCross1
              fontSize='20px'
              cursor='pointer'
              onClick={() =>
                dispatch(
                  changeInfoPanelVisibility({ infoPanelIsVisible: false })
                )
              }
            />
            <Heading as='h3' fontSize='lg' fontWeight={500}>
              Info. del grupo
            </Heading>
          </HStack>
        </Header>
      </motion.div>
      <SectionWithScroll>
        <Stack
          as={motion.div}
          py={10}
          spacing={8}
          divider={
            <StackDivider
              bgColor={colors.background}
              borderBottomWidth='3px !important'
            />
          }
          pointerEvents={infoPanelIsVisible ? 'auto' : 'none'}
          variants={{
            open: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
        >
          <motion.div variants={itemVariants}>
            <ChatPresentation />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ChatDetails />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ChatIntegrants />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ChatDangerActions />
          </motion.div>
        </Stack>
      </SectionWithScroll>
    </ChatLayout>
  )
}
