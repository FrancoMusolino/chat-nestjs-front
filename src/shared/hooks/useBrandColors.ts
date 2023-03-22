import React from 'react'
import { useTheme } from '@chakra-ui/react'

import { BrandTheme } from '@/theme'

export const useBrandColors = () => {
  const {
    colors: { brand },
  } = useTheme<BrandTheme>()

  return { colors: brand }
}
