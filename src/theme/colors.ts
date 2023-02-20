import { Theme } from "@chakra-ui/react";

export interface BrandsColors extends Partial<Theme["colors"]> {
  brand: {
    primary: string;
    secondary: string;
    background: string;
    "text-white": string;
    "text-gray": string;
    "dropdown-background": string;
    "button-gray": string;
    danger: string;
    "primary-hover": string;
    "secondary-hover": string;
    "danger-hover": string;
  };
}

export const colors: BrandsColors = {
  brand: {
    primary: "#005C4B",
    secondary: "#202C33",
    background: "#111B21",
    "text-white": "#E9EDD5",
    "text-gray": "#869694",
    "dropdown-background": "#233138",
    "button-gray": "#484C56",
    danger: "#F15C6D",
    "primary-hover": "#00735E",
    "secondary-hover": "#5A5C61",
    "danger-hover": "#FF697A",
  },
};
