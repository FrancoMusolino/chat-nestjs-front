import React from 'react'
import {
  Avatar as ChakraAvatar,
  AvatarProps as ChakraAvatarProps,
  StyleProps,
} from '@chakra-ui/react'

type AvatarProps = StyleProps &
  ChakraAvatarProps & {
    /**@default false */
    isGroupPicture?: boolean

    /**@default false */
    isEditable?: boolean
  }

export const Avatar = ({ src, ...props }: AvatarProps) => {
  return (
    <ChakraAvatar
      src={
        src ||
        'https://res.cloudinary.com/francomuso/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1677594530/chat/ProfilePicture/default-profile-picture.jpg'
      }
      ignoreFallback
      {...props}
    />
  )
}
