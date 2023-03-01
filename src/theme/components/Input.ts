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
    outline: {
      field: {
        paddingInline: '16px',
        paddingBlock: '6px',
        color: 'brand.text-gray',
        fontSize: 'md',
        border: '2px solid #869694',
        borderRadius: '12px',
        _focus: {
          borderColor: 'none',
        },
        _placeholder: {
          color: 'brand.text-gray',
        },
        _focusVisible: {
          borderColor: 'none',
          boxShadow: 'none',
        },
      },
    },
  },
}
