import React, { ChangeEvent, EventHandler, FC, ReactNode } from 'react';
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
  ...rest
}) => {
  return (
    <FormControl {...formControlProps}>
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
