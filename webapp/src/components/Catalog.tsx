import { Rock } from "../shared/shareddtypes";
import List from "@mui/material/List";
import Product from "./Product";
import { Button, Grid } from "@mui/material";
import RangeSlider from "./Rangeslider";
import BasicTextFieldWithOptions from "./TextFieldWithOptions";
import BasicTextField from "./TextField";
import { getFilteredRocks } from "../api/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
type RockListProps = {
  handleAddToCart(rock: Rock): void;
};

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
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
//a
function Catalogo(rockListPros: RockListProps): JSX.Element {
  let query = useQuery();
  const [rocks, setRocks] = useState<Rock[]>([]);
  const [mohsMin, setMohsMin] = useState<number>(
    defaultCriteryForSearch.mohsMin
  );
  const [mohsMax, setMohsMax] = useState<number>(
    defaultCriteryForSearch.mohsMax
  );
  const [densityMin, setDensityMin] = useState<number>(
    defaultCriteryForSearch.densityMin
  );
  const [densityMax, setDensityMax] = useState<number>(
    defaultCriteryForSearch.densityMax
  );
  const [priceMin, setPriceMin] = useState<number>(
    defaultCriteryForSearch.priceMin
  );
  const [priceMax, setPriceMax] = useState<number>(
    defaultCriteryForSearch.priceMax
  );
  const [type, setType] = useState<string>(defaultCriteryForSearch.type);
  const [nameSubstring, setNameSubstring] = useState<string>(
    defaultCriteryForSearch.nameSubstring
  );
  //?densityMin=1&densityMax=3
  const refreshRockList = async () => {
    const mohsMinStr = query.get("mohsMin"),
      mohsMaxStr = query.get("mohsMax"),
      densityMinStr = query.get("densityMin"),
      densityMaxStr = query.get("densityMax"),
      priceMinStr = query.get("priceMin"),
      priceMaxStr = query.get("pirceMax");
    var nameSubstring = query.get("nameSubstring");
    var typeSearched = query.get("type");

    nameSubstring =
      nameSubstring === null || nameSubstring === "undefined"
        ? ""
        : nameSubstring;

    typeSearched =
      typeSearched === null ||
      typeSearched === "undefined" ||
      typeSearched === "todas"
        ? ""
        : typeSearched;
    let mohsMin: number,
      mohsMax: number,
      densityMin: number,
      densityMax: number,
      priceMin: number,
      priceMax: number;

    if (mohsMinStr !== undefined && mohsMinStr !== null)
      mohsMin = parseFloat(mohsMinStr);
    else mohsMin = defaultCriteryForSearch.mohsMin;

    if (mohsMaxStr !== undefined && mohsMaxStr !== null)
      mohsMax = parseFloat(mohsMaxStr);
    else mohsMax = defaultCriteryForSearch.mohsMax;

    if (densityMinStr !== undefined && densityMinStr !== null)
      densityMin = parseFloat(densityMinStr);
    else densityMin = defaultCriteryForSearch.densityMin;

    if (densityMaxStr !== undefined && densityMaxStr !== null)
      densityMax = parseFloat(densityMaxStr);
    else densityMax = defaultCriteryForSearch.densityMax;

    if (priceMinStr !== undefined && priceMinStr !== null)
      priceMin = parseFloat(priceMinStr);
    else priceMin = defaultCriteryForSearch.priceMin;

    if (priceMaxStr !== undefined && priceMaxStr !== null)
      priceMax = parseFloat(priceMaxStr);
    else priceMax = defaultCriteryForSearch.priceMax;



    setRocks(
      await getFilteredRocks(
        mohsMin,
        mohsMax,
        densityMin,
        densityMax,
        priceMin,
        priceMax,
        nameSubstring,
        typeSearched
      )
    );
  };
  const handleChangeMohs = (low: number, high: number) => {
    setMohsMin(low);
    setMohsMax(high);
  };
  const handleChangeDensity = (low: number, high: number) => {
    setDensityMin(low);
    setDensityMax(high);
  };
  const handleChangePrice = (low: number, high: number) => {
    setPriceMin(low);
    setPriceMax(high);
  };
  const handleChangeNameSubstring = (nameSubstring: string) => {
    setNameSubstring(nameSubstring);
  };
  const handleChangeType = (type: string) => {
    setType(type);
  };

  useEffect(() => {
    refreshRockList();
  }, []);
  //TODO: El nameSubstring se come la ultima letra
  let filterLink =
    "/catalog?mohsMin=" +
    mohsMin +
    "&mohsMax=" +
    mohsMax +
    "&densityMin=" +
    densityMin +
    "&densityMax=" +
    densityMax +
    "&priceMin=" +
    priceMin +
    "&priceMax=" +
    priceMax +
    "&nameSubstring=" +
    nameSubstring +
    "&type=" +
    type;
  return (
    <>
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
            actualMin={mohsMin}
            actualMax={mohsMax}
          />
          
        </Grid>
        <Grid item xs={12 / 3}>
          <RangeSlider
            min={defaultCriteryForSearch.densityMin}
            max={defaultCriteryForSearch.densityMax}
            valueName={"Densidad"}
            onValueChanged={handleChangeDensity}
            actualMin={densityMin}
            actualMax={densityMax}
          />
        </Grid>
        <Grid item xs={12 / 3}>
          <RangeSlider
            min={defaultCriteryForSearch.priceMin}
            max={defaultCriteryForSearch.priceMax}
            valueName={"Precio"}
            onValueChanged={handleChangePrice}
            actualMin={priceMin}
            actualMax={priceMax}
          />
        </Grid>
        <Grid item xs={6}>
          <BasicTextFieldWithOptions
            values={TYPES_LIST}
            onValueChanged={handleChangeType}
            titleText={"Tipo de rocas"}
            helperText={"Selecciona el tipo de roca"}
          />
        </Grid>
        <Grid item xs={6}>
          <BasicTextField
            value={nameSubstring}
            label={"Nombre"}
            placeholder={"Ej: Cuarcita"}
            onChange={handleChangeNameSubstring}
          />
        </Grid>
        <Grid item xs={9}></Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            href={filterLink}
            fullWidth
            onClick={refreshRockList}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
      <List id="catalog">
        {rocks.map((rock, index) => {
          return (
            <Product
              product={rock}
              key={index}
              buyable={true}
              handleAddToCart={rockListPros.handleAddToCart}
            />
          );
        })}
      </List>
    </>
  );
}

export default Catalogo;
