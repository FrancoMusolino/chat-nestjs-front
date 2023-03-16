import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  NovuProvider,
  PopoverNotificationCenter,
  IMessage,
  INovuThemeProvider,
} from '@novu/notification-center'

import { NotificationBell } from './NotificationBell'
import { useStoreSelector } from '@/shared/app/store'

const theme: INovuThemeProvider = {
  common: { fontFamily: 'Inter' },
  dark: {
    notificationItem: {
      read: { background: '#202C33', timeMarkFontColor: '#869694' },
      unread: {
        background: '#202C33',
        timeMarkFontColor: '#869694',
        notificationItemBeforeBrandColor: '#005C4B',
      },
    },
    layout: { background: '#233138' },
  },
}

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
    >
      <PopoverNotificationCenter
        onNotificationClick={onNotificationClick}
        colorScheme='dark'
        position='right-start'
        theme={theme}
        showUserPreferences={false}
      >
        {({ unseenCount }) => (
          <NotificationBell unseenCount={unseenCount || 0} />
        )}
      </PopoverNotificationCenter>
    </NovuProvider>
  )
}
