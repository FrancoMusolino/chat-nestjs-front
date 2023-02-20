import { Theme } from "@chakra-ui/react";

export interface BrandFontSizes extends Partial<Theme["fontSizes"]> {}

export const fontSizes: BrandFontSizes = {
  "4xl": "2rem", // 32px
  "6xl": "4rem", // 64px
};
