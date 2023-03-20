import React from 'react'
import { Skeleton } from '@chakra-ui/react'

import { generateArrayWithRandomKeys } from '@/shared/utils'

export const ChatIntegrantLoader = () => {
  return (
    <>
      {generateArrayWithRandomKeys(5).map((i) => (
        <Skeleton key={i} minH='45px' borderRadius={5}>
          ChatItemLoader
        </Skeleton>
      ))}
    </>
  )
}
