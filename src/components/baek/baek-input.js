import React from 'react';
import { FormControl, Input, InputLabel } from '@material-ui/core';


const BaekInput = ({
  formControlProps,
  label,
  error,
  id,
  inputProps,
  labelProps,
  success,
  onChange,
  width,
  ...rest
}) => {
  return (
    <FormControl {...formControlProps} style={{width: width}}>
      {label && (
        <InputLabel htmlFor={id} {...labelProps}>
          {label}
        </InputLabel>
      )}
      <Input
        id={id}
        onChange={onChange}
        {...inputProps}
        {...rest}
      />
    </FormControl>
  );
};

export default BaekInput;
