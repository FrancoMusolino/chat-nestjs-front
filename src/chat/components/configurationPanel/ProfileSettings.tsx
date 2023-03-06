import React from 'react'
import { Stack } from '@chakra-ui/react'

import { SettingsInput } from './SettingsInput'
import { Avatar } from '@/shared/components/Avatar'
import { useStoreSelector } from '@/shared/app/store'
import { SettingsEditableInput } from './SettingsEditableInput'
import { Button } from '@/shared/components/Button'

export const ProfileSettings = () => {
  const { username, status, profilePicture } = useStoreSelector('session')

  return (
    <Stack spacing={10} py={10} px={5}>
      <Avatar src={profilePicture} w='150px' h='150px' alignSelf='center' />

      <SettingsInput label='Tu username' isReadOnly value={username} />
      <SettingsEditableInput defaultValue={status} />

      <Button btnType='danger' w='max-content' alignSelf='center' fontSize='md'>
        Eliminar cuenta
      </Button>
    </Stack>
  )
}
