import { extendTheme, Theme } from "@chakra-ui/react";

import { BrandsColors, colors } from "./colors";
import { styles } from "./styles";
import { fontSizes, BrandFontSizes } from "./foundations/fontSizes";

type BrandOwnProps = {
  colors: BrandsColors;
  fontSizes: BrandFontSizes;
};

export type BrandTheme = BrandOwnProps &
  Partial<Omit<Theme, keyof BrandOwnProps>>;

const overrides = {
  styles,
  colors,
  fontSizes,
};

export default extendTheme(overrides);
