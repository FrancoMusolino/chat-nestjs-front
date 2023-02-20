import type { StyleFunctionProps } from "@chakra-ui/styled-system";

export const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bgColor: props.theme.colors.brand.background,
      WebkitTapHighlightColor: "transparent",
    },
  }),
};
