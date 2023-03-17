import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  NovuProvider,
  PopoverNotificationCenter,
  IMessage,
} from '@novu/notification-center'

import { NotificationBell } from './NotificationBell'
import { useStoreSelector } from '@/shared/app/store'
import { NOVU_THEME } from '@/shared/constants'

export const NotificationCenter = () => {
  const navigate = useNavigate()

  const { id } = useStoreSelector('session')

  const onNotificationClick = (message: IMessage) => {
    if (message?.cta?.data?.url) {
      navigate(message.cta.data.url)
    }
  }

  return (
    <NovuProvider
      subscriberId={id}
      applicationIdentifier={import.meta.env.VITE_NOVU_APP_IDENTIFIER}
      i18n='es'
    >
      <PopoverNotificationCenter
        onNotificationClick={onNotificationClick}
        colorScheme='dark'
        position='right-start'
        theme={NOVU_THEME}
      >
        {({ unseenCount }) => (
          <NotificationBell unseenCount={unseenCount || 0} />
        )}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}
