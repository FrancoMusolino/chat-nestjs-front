import React, { useState } from 'react'

import { EditablePicture } from '../EditablePicture'

import { useGlobalDispatch, useStoreSelector } from '@/shared/app/store'
import { updateSession } from '@/shared/features/session/session.actions'
import { useUpdateUserMutation } from '@/shared/services/user.service'
import { useErrorMessage, useCloudinaryWidget } from '@/shared/hooks'

const opts = {
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_USERS,
}

export const ChangeProfilePicture = () => {
  const [isLoading, setIsLoading] = useState(false)

  const { id, profilePicture } = useStoreSelector('session')
  const dispatch = useGlobalDispatch()

  const { mutateAsync: updateProfile, error } = useUpdateUserMutation(id)
  useErrorMessage(error)

  const { open } = useCloudinaryWidget({
    opts,
    successFn: async (secureUrl) => {
      setIsLoading(true)

      const res = await updateProfile({ profilePicture: secureUrl })

      if (!('error' in res)) {
        dispatch(updateSession({ profilePicture: res.profilePicture }))
      }

      setIsLoading(false)
    },
  })

  return (
    <EditablePicture
      boxProps={{ onClick: open }}
      avatarProps={{ src: profilePicture, boxSize: '150px' }}
      text='Cambiar foto de perfil'
      isLoading={isLoading}
    />
  )
}
