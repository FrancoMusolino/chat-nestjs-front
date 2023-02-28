import { Stack } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const SectionWithScroll = styled(Stack)`
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #202c33;
    border-radius: 30px;
  }
`
