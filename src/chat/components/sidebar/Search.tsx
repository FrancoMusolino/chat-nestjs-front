import React from 'react'
import {
  Box,
  color,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

import { useBrandTheme } from '@/shared/hooks'

export const Search = () => {
  const { colors } = useBrandTheme()

  return (
    <Box pl={3} paddingBlock={4}>
      <InputGroup>
        <InputLeftElement
          pointerEvents='none'
          children={<HiMagnifyingGlass fill={colors.brand['text-gray']} />}
        />
        <Input
          variant='filled'
          w='80%'
          h='38px'
          fontSize='sm'
          _placeholder={{ color: colors.brand['text-gray'] }}
          placeholder='Busca un chat'
        />
      </InputGroup>
    </Box>
  )
}
