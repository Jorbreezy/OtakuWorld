const CustomStyle = {
  control: (styles) => ({
    ...styles, backgroundColor: '#414d5e', border: '#414d5e', color: '#bbe1fa',
  }),
  menu: (styles) => ({ ...styles, backgroundColor: '#414d5e', color: '#bbe1fa' }),
  option: (styles, {
    isDisabled, isFocused,
  }) => {
    const color = '#6699cc';
    return {
      ...styles,
      backgroundColor: isFocused ? color : '#414d5e',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      color: '#bbe1fa',
    };
  },
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#bbe1fa',
  }),
  singleValue: (styles) => ({ ...styles, color: '#bbe1fa' }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: '#8999ae',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: '#ae8999',
      color: '#996b7f',
    },
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    color: '#bbe1fa',
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: '#bbe1fa',
    ':hover': {
      color: '#ae8999',
    },
  }),
};

export default CustomStyle;
