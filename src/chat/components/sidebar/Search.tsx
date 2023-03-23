import React, { useState, useEffect } from 'react'
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { FiArrowLeft } from 'react-icons/fi'

import { useBrandColors, useDebounceValue } from '@/shared/hooks'
import { useGlobalDispatch } from '@/shared/app/store'
import { applyFilter } from '@/shared/features/chat/chat.actions'

export const Search = () => {
  const { colors } = useBrandColors()

  const [searchQuery, setSearchQuery] = useState('')

  const dispatch = useGlobalDispatch()

  const debounceQuery = useDebounceValue(searchQuery, 300)

  useEffect(() => {
    dispatch(applyFilter({ filter: debounceQuery }))
  }, [debounceQuery])

  return (
    <Box pl={3} paddingBlock={4}>
      <InputGroup>
        {searchQuery ? (
          <InputLeftElement
            cursor='pointer'
            children={<FiArrowLeft color={colors.primary} />}
            onClick={() => setSearchQuery('')}
          />
        ) : (
          <InputLeftElement
            pointerEvents='none'
            children={<HiMagnifyingGlass color={colors['text-gray']} />}
          />
        )}
        <Input
          variant='filled'
          w='80%'
          h='38px'
          fontSize='sm'
          _placeholder={{ color: colors['text-gray'] }}
          placeholder='Busca un chat'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>
    </Box>
  )
}
