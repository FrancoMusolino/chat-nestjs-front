import React from 'react'
import { Text, useTheme } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { BrandTheme } from '@/theme'

type QuestionProps = {
  question: string
  linkTxt: string
  to: string
}

export const Question = ({ question, to, linkTxt }: QuestionProps) => {
  const { colors } = useTheme<BrandTheme>()

  const navigate = useNavigate()

  return (
    <Text fontSize='sm' color={colors.brand['text-gray']}>
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
