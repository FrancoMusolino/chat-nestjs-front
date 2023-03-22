import React from 'react'
import { Heading, HStack, StackDivider } from '@chakra-ui/react'
import { RxCross1 } from 'react-icons/rx'

import { ChatLayout } from '../../layout/ChatLayout'
import { Header } from '../Header'
import { ChatDetails } from './ChatDetails'
import { ChatIntegrants } from './ChatIntegrants'
import { useGlobalDispatch } from '@/shared/app/store'
import { changeInfoPanelVisibility } from '@/shared/features/chat/chat.actions'
import { ChatPresentation } from './ChatPresentation'
import { useBrandColors } from '@/shared/hooks'
import { SectionWithScroll } from '@/shared/components/SectionWithScroll'

export const ChatInfo = () => {
  const { colors } = useBrandColors()

  const dispatch = useGlobalDispatch()

  return (
    <ChatLayout borderLeft={`1px solid ${colors.secondary}`}>
      <Header minH='75px'>
        <HStack paddingLeft={6} spacing={6}>
          <RxCross1
            fontSize='20px'
            cursor='pointer'
            onClick={() =>
              dispatch(changeInfoPanelVisibility({ infoPanelIsVisible: false }))
            }
          />
          <Heading as='h3' fontSize='lg' fontWeight={500}>
            Info. del grupo
          </Heading>
        </HStack>
      </Header>
      <SectionWithScroll
        py={10}
        spacing={8}
        divider={
          <StackDivider
            bgColor={colors.secondary}
            borderBottomWidth='3px !important'
          />
        }
      >
        <ChatPresentation />
        <ChatDetails />
        <ChatIntegrants />
      </SectionWithScroll>
    </ChatLayout>
  )
}
