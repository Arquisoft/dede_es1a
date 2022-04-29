import { Rock } from "../shared/shareddtypes";
import Product from "./Product";
import {
  Accordion,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import { getFilteredRocks } from "../api/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Filter, { defaultCriteryForSearch } from "./Filter";
type RockListProps = {
  handleAddToCart(rock: Rock): void;
  testRocks?: Rock[];
};



function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
//a
function Catalog(rockListPros: RockListProps): JSX.Element {
  let query = useQuery();

  const [rocks, setRocks] = useState<Rock[]>([]);


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
    if (rockListPros.testRocks === undefined)
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
    else setRocks(rockListPros.testRocks);
  };



  useEffect(() => {
    refreshRockList();
  }, []);
  //TODO: El nameSubstring se come la ultima letra

  return (
    <>
      <Accordion id="accordeonFilter">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filtrar</Typography>
        </AccordionSummary>
        <Filter refreshRockList={refreshRockList}/>
      </Accordion>
      <Grid container spacing={3} rowSpacing={7} padding={2}>
        {rocks.map((rock, index) => {
          return (
            <Grid item xs={3} key={index}>
            <Product
              product={rock}
              
              buyable={true}
              handleAddToCart={rockListPros.handleAddToCart}
            />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Catalog;
