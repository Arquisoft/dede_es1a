
import * as React from 'react';
import TextField from '@mui/material/TextField';

type BasicTextFieldProps={
    label:string,
    placeholder:string
}
export default function BasicTextField(basicTextFieldProps:BasicTextFieldProps) {

  return (
    <TextField
    fullWidth 
    id={basicTextFieldProps.placeholder}
    label={basicTextFieldProps.label}
    placeholder={basicTextFieldProps.placeholder}
    multiline
    />

  );
}