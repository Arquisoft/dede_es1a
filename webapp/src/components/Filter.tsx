import { Button, Grid } from "@mui/material";
import { useState } from "react";
import RangeSlider from "./Rangeslider";
import BasicTextField from "./TextField";
import BasicTextFieldWithOptions from "./TextFieldWithOptions";

export const TYPES_LIST = ["todas", "metamórfica", "sedimentaria", "ígnea"];
export enum TYPES_INDEX {
  ALL = 0,
  METAMORPHIC,
  SEDIMENTARY,
  IGNEOUS,
}
export const defaultCriteryForSearch: DefaultSearchCritery = {
    mohsMin: 0,
    mohsMax: 10,
    densityMin: 0,
    densityMax: 100,
    priceMin: 0,
    priceMax: 100,
    type: TYPES_LIST[TYPES_INDEX.ALL],
    nameSubstring: "",
  };
  type DefaultSearchCritery = {
    mohsMin: number;
    mohsMax: number;
    densityMin: number;
    densityMax: number;
    priceMin: number;
    priceMax: number;
    type: string;
    nameSubstring: string;
  };
  export type SearchCritery = {
    mohsMin?: number;
    mohsMax?: number;
    densityMin?: number;
    densityMax?: number;
    priceMin?: number;
    priceMax?: number;
    type?: string;
    nameSubstring?: string;
  };
type FilterProps = {
  refreshRockList:() => Promise<void>
};
function Filter(props: FilterProps): JSX.Element {
    const [critery,setCritery]= useState<DefaultSearchCritery>(
        defaultCriteryForSearch
      );
  const handleChangeMohs = (low: number, high: number) => {
    setCritery(critery => ({
        ...critery,
        mohsMin:low,
        mohsMax:high
      }));
  };
  const handleChangeDensity = (low: number, high: number) => {
    setCritery(critery => ({
        ...critery,
        densityMin:low,
        densityMax:high
      }));
  };
  const handleChangePrice = (low: number, high: number) => {
    setCritery(critery => ({
        ...critery,
        priceMin:low,
        priceMax:high
      }));
  };
  const handleChangeNameSubstring = (name:string)=>{

  }
  const handleChangeType = (name:string)=>{

  }
  let filterLink =
  "/catalog?mohsMin=" +
  critery.mohsMin +
  "&mohsMax=" +
  critery.mohsMax +
  "&densityMin=" +
  critery.densityMin +
  "&densityMax=" +
  critery.densityMax +
  "&priceMin=" +
  critery.priceMin +
  "&priceMax=" +
  critery.priceMax +
  "&nameSubstring=" +
  critery.nameSubstring +
  "&type=" +
  critery.type;
  return (
    <Grid
      id="catalogFilter"
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      <Grid item xs={12 / 3}>
        <RangeSlider
          min={defaultCriteryForSearch.mohsMin}
          max={defaultCriteryForSearch.mohsMax}
          valueName={"Mohs"}
          onValueChanged={handleChangeMohs}
          actualMin={critery.mohsMin}
          actualMax={critery.mohsMax}
        />
      </Grid>
      <Grid item xs={12 / 3}>
        <RangeSlider
          min={defaultCriteryForSearch.densityMin}
          max={defaultCriteryForSearch.densityMax}
          valueName={"Densidad"}
          onValueChanged={handleChangeDensity}
          actualMin={critery.densityMin}
          actualMax={critery.densityMax}
        />
      </Grid>
      <Grid item xs={12 / 3}>
        <RangeSlider
          min={defaultCriteryForSearch.priceMin}
          max={defaultCriteryForSearch.priceMax}
          valueName={"Precio"}
          onValueChanged={handleChangePrice}
          actualMin={critery.priceMin}
          actualMax={critery.priceMax}
        />
      </Grid>
      <Grid item xs={6}>
        <BasicTextFieldWithOptions
          values={TYPES_LIST}
          onValueChanged={handleChangeType}
          titleText={"Tipo de rocas"}
          helperText={"Selecciona el tipo de roca"}
          actualValue={critery.type}
        />
      </Grid>
      <Grid item xs={6}>
        <BasicTextField
          value={critery.nameSubstring}
          label={"Nombre"}
          placeholder={"Ej: Cuarcita"}
          onChange={handleChangeNameSubstring}
          actualValue={critery.nameSubstring}
        />
      </Grid>
      <Grid item xs={9}></Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          href={filterLink}
          fullWidth
          onClick={props.refreshRockList}
        >
          Buscar
        </Button>
      </Grid>
    </Grid>
  );
}

export default Filter;
