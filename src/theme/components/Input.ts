const filledBgColor = {
  backgroundColor: 'brand.secondary',
}

export const Input = {
  baseStyle: {
    field: {
      width: 'auto',
    },
  },
  variants: {
    filled: {
      field: {
        ...filledBgColor,
        color: 'brand.text-gray',
        borderRadius: '5px',
        _focus: {
          ...filledBgColor,
        },
        _focusVisible: {
          borderColor: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
}
