import { extendTheme, Theme } from '@chakra-ui/react'

import { styles } from './styles'
import { components } from './components'
import { BrandsColors, colors } from './colors'
import { fonts } from './fonts'
import { fontSizes, BrandFontSizes } from './foundations/fontSizes'

type BrandOwnProps = {
  colors: BrandsColors
  fontSizes: BrandFontSizes
}

export type BrandTheme = BrandOwnProps &
  Partial<Omit<Theme, keyof BrandOwnProps>>

const overrides = {
  styles,
  components,
  colors,
  fonts,
  fontSizes,
}

export default extendTheme(overrides)
