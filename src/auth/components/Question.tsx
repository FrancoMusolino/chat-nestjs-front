import React from 'react'
import { Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { useBrandTheme } from '@/shared/hooks'

type QuestionProps = {
  question: string
  linkTxt: string
  to: string
}

export const Question = ({ question, to, linkTxt }: QuestionProps) => {
  const { colors } = useBrandTheme()

  const navigate = useNavigate()

  return (
    <Text fontSize='sm' color={colors.brand['text-gray']} userSelect='none'>
      {question}{' '}
      <Text
        as='span'
        color={colors.brand.primary}
        _hover={{
          textDecor: 'underline',
          cursor: 'pointer',
        }}
        onClick={() => navigate(to)}
      >
        {linkTxt}
      </Text>
    </Text>
  )
}
