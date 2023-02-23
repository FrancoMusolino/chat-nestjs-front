import type { StyleFunctionProps } from '@chakra-ui/styled-system'

export const styles = {
  global: (props: StyleFunctionProps) => ({
    '*': {
      color: props.theme.colors.brand['text-white'],
    },
    body: {
      bgColor: props.theme.colors.brand.background,
      WebkitTapHighlightColor: 'transparent',
    },
  }),
}
