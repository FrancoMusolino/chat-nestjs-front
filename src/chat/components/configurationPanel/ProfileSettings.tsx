import React from 'react'
import { Stack } from '@chakra-ui/react'

import { ChangeProfilePicture } from './ChangeProfilePicture'
import { SettingsInput } from './SettingsInput'
import { SettingsEditableInput } from './SettingsEditableInput'
import { DeleteAccount } from '../DeleteAccount'

import { useStoreSelector } from '@/shared/app/store'
import { Button } from '@/shared/components/Button'
import { Modal } from '@/shared/components/Modal'

export const ProfileSettings = () => {
  const { username, status } = useStoreSelector('session')

  return (
    <Stack spacing={10} py={10} px={5}>
      <ChangeProfilePicture />
      <SettingsInput label='Tu username' isReadOnly value={username} />
      <SettingsEditableInput label='Tu estado' defaultValue={status} />
      <Modal
        modalTitle='Eliminar cuenta (está acción es irreversible)'
        trigger={Button}
        triggerText='Eliminar cuenta'
        triggerProps={{
          children: '',
          btnType: 'danger',
          w: 'max-content',
          alignSelf: 'center',
          fontSize: 'md',
        }}
      >
        <DeleteAccount />
      </Modal>
    </Stack>
  )
}
