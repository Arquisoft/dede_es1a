import * as React from 'react';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';

function valuetext(value: number) {
  return `${value}°C`;
}
type SliderProps={
    max:number,
    min:number,
    valueName:string,
    onValueChanged(low:Number,high:Number):void
}

export default function RangeSlider(sliderProps:SliderProps) {
  const [value, setValue] = React.useState<number[]>([sliderProps.min, sliderProps.max]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    sliderProps.onValueChanged(value[0],value[1])
  };

  return (
    <>
        <Typography gutterBottom>{sliderProps.valueName}</Typography>
        <Slider
            
            getAriaLabel={() => sliderProps.valueName}
            aria-label={sliderProps.valueName}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            id={sliderProps.valueName}
            size="medium"
        />
    </>
  );
}