const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-24px)',
}

export const Form = {
  variants: {
    floating: {
      container: {
        _focusWithin: {
          label: {
            ...activeLabelStyles,
          },
        },
        'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
          {
            ...activeLabelStyles,
          },
        label: {
          top: 0,
          left: 0,
          zIndex: 2,
          position: 'absolute',
          color: '#E9EDD5',
          backgroundColor: 'brand.background',
          pointerEvents: 'none',
          mx: 3,
          px: 1,
          my: 2,
          transformOrigin: 'left top',
        },
        input: {
          py: '20px',
          color: 'brand[text-white]',
          border: '1px solid #E9EDD5',
          borderRadius: '10px',
          _hover: {
            borderColor: 'unset',
          },
          _focusVisible: {
            borderColor: 'unset',
            boxShadow: 'none',
          },
          _invalid: {
            border: '1px solid #F15C6D',
            boxShadow: 'none',
          },
        },
      },
    },
  },
}
