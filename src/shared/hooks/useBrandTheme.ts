import React from 'react'
import { useTheme } from '@chakra-ui/react'

import { BrandTheme } from '@/theme'

export const useBrandTheme = () => {
  return useTheme<BrandTheme>()
}
