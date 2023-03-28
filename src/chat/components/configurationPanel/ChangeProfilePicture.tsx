import React from 'react'

import { EditablePicture } from '../EditablePicture'

import { useGlobalDispatch, useStoreSelector } from '@/shared/app/store'
import { updateSession } from '@/shared/features/session/session.actions'
import { useUpdateUserMutation } from '@/shared/services/user.service'
import { useErrorMessage, useCloudinaryWidget } from '@/shared/hooks'

export const ChangeProfilePicture = () => {
  const { id, profilePicture } = useStoreSelector('session')
  const dispatch = useGlobalDispatch()

  const { mutate: updateProfile, error, isLoading } = useUpdateUserMutation(id)
  useErrorMessage(error)

  const { open } = useCloudinaryWidget({
    opts: {
      uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET_USERS,
    },
    successFn: (secureUrl) =>
      updateProfile(
        { profilePicture: secureUrl },
        {
          onSuccess: () => {
            dispatch(updateSession({ profilePicture: secureUrl }))
          },
        }
      ),
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
