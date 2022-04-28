import { useEffect, useState } from "react";
import {
  getRocksFiery,
  getRocksMetamorphic,
  getRocksSedimentary,
} from "../api/api";
import { Rock } from "../shared/shareddtypes";
import Showcase from "./Showcase";
import prefilters from "../code/Prefilters";
import { Grid } from "@mui/material";
import { SearchCritery, TYPES_INDEX, TYPES_LIST } from "./Catalog";

type RockListProps = {
  handleAddToCart(r: Rock): void;
};

const LIST_OF_CRITERIES:Record<string, SearchCritery>[]=[
{'Sedimentary':{type:'Sedimentary'}},
{}
]

function Showcases(prefilteredbox: RockListProps): JSX.Element {
  const [nameOfFilters, setNameOfFilters] = useState<String[]>([]);

  useEffect(() => {
    const refreshRockList = async () => {
      setNameOfFilters(prefilters);
    };
    refreshRockList();
  }, []);
  return (
    <>
    <Grid container spacing={3} >
      {LIST_OF_CRITERIES.map((_, element) => {
        
        return (
          <Grid item xs={6} key={element}>
          <Showcase
              key={element}
              name={nameOfFilters[element]}
              handleAddToCart={prefilteredbox.handleAddToCart} search={{
                type: TYPES_LIST[element],
              }}  />
          </Grid>
        );
        
      })}
      </Grid>
    </>
  );
}
export default Showcases;
