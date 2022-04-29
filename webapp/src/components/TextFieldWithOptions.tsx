import * as React from "react";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

type BasicTextFieldProps = {
  values: string[];
  actualValue:string;
  titleText: string;
  helperText: string;
  onValueChanged(type: string): void;
};
export default function BasicTextFieldWithOptions(
  basicTextFieldProps: BasicTextFieldProps
) {

  const [value, setValue] = React.useState(basicTextFieldProps.actualValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    basicTextFieldProps.onValueChanged(event.target.value);
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
      {basicTextFieldProps.values.map((value, number) => (
        <MenuItem key={number} value={value}>
          {value}
        </MenuItem>
      ))}
    </TextField>
  );
}
