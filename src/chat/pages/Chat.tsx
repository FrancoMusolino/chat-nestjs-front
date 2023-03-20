import React from 'react'

import { ChatLayout } from '../layout/ChatLayout'
import { ChatHeader } from '../components/ChatHeader'
import { SubmitMessage } from '../components/SubmitMessage'
import { Messages } from '../components/Messages'

export const Chat = () => {
  return (
    <ChatLayout>
      <ChatHeader />
      <Messages />
      <SubmitMessage />
    </ChatLayout>
  )
}
