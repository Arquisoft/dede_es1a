
import * as React from 'react';
import TextField from '@mui/material/TextField';

type BasicTextFieldProps={
    label:string,
    placeholder:string,
    value:string,
    onChange(nameSubstring:string):void
}
export default function BasicTextField(basicTextFieldProps:BasicTextFieldProps) {
  const [value, setValue] = React.useState<string>(basicTextFieldProps.value);

  const handleTextField=(event:React.ChangeEvent<HTMLInputElement>)=>{
    
    setValue(event.target.value)
    basicTextFieldProps.onChange(value)
    console.log(value)
  }
  return (
    <TextField
    fullWidth 
    id={basicTextFieldProps.placeholder}
    label={basicTextFieldProps.label}
    placeholder={basicTextFieldProps.placeholder}
    defaultValue={value}
    multiline
    onChange={handleTextField}
    />
  );
}