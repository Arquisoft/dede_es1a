
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';

type BasicTextFieldProps={
    values:string[],
    titleText:string,
    helperText:string
}
export default function BasicTextFieldWithOptions(basicTextFieldProps:BasicTextFieldProps) {
    const [value, setValue] = React.useState(basicTextFieldProps.values[0]);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      };
  return (
    <TextField
    fullWidth 
    id="filled-select-currency"
    select
    label={basicTextFieldProps.titleText}
    value={value}
    onChange={handleChange}
    helperText={basicTextFieldProps.helperText}
    variant="filled"
    >
    {basicTextFieldProps.values.map((value,number) => (
    <MenuItem key={number} value={value}>
        {value}
    </MenuItem>
    ))}
    </TextField>

  );
}