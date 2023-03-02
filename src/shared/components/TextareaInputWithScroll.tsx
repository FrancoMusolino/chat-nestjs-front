import styled from '@emotion/styled'
import { Input } from '@chakra-ui/react'

export const TextareaInputWithScroll = styled(Input)`
  resize: none;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: #869694;
    border-radius: 30px;
  }

  &::-webkit-scrollbar-track {
    margin: 12px;
  }
`
