import * as React from "react";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";


type SliderProps = {
  max: number;
  min: number;
  actualMin:number;
  actualMax:number;
  valueName: string;
  onValueChanged(low: Number, high: Number): void;
};

export default function RangeSlider(sliderProps: SliderProps) {
  const [value, setValue] = React.useState<number[]>([
    sliderProps.actualMin,
    sliderProps.actualMax,
  ]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    sliderProps.onValueChanged(
      (newValue as number[])[0],
      (newValue as number[])[1]
    );
  };

  return (
    <>
      <Typography gutterBottom>{sliderProps.valueName}</Typography>
      <Slider
        getAriaLabel={() => sliderProps.valueName}
        value={value}
        step={0.01}
        max={sliderProps.max}
        min={sliderProps.min}
        onChange={handleChange}
        valueLabelDisplay="auto"
        id={sliderProps.valueName}
        size="medium"
      />
      
    </>
  );
}
