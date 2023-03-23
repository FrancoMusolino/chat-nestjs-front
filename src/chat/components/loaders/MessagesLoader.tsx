import React from 'react'
import { Box, HStack, Skeleton, SkeletonCircle } from '@chakra-ui/react'

import { generateArrayWithRandomKeys } from '@/shared/utils'

export const MessagesLoader = () => {
  return (
    <>
      {generateArrayWithRandomKeys(5).map((id, index) => {
        const isSender = index % 2 === 0

        return (
          <HStack
            key={id}
            justify={isSender ? 'flex-end' : 'flex-start'}
            align='flex-start'
            spacing={0}
            gap={2}
          >
            <Box w='35px' order={isSender ? 2 : 1}>
              <SkeletonCircle size='35' />
            </Box>

            <Skeleton
              w='280px'
              h='50px'
              order={isSender ? 1 : 2}
              borderRadius={10}
            />
          </HStack>
        )
      })}
    </>
  )
}
