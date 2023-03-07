import React from 'react'
import { Skeleton, Stack } from '@chakra-ui/react'

import { generateArrayWithRandomKeys } from '@/shared/utils'

export const ChatItemLoader = () => {
  return (
    <Stack spacing={3} px={3}>
      {generateArrayWithRandomKeys(5).map((i) => (
        <Skeleton key={i} h='50px' borderRadius={10}>
          ChatItemLoader
        </Skeleton>
      ))}
    </Stack>
  )
}
