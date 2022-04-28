import { AppBar, Button, Card, Grid, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { Rock } from "../shared/shareddtypes";
import Product from "./Product";
import { defaultCriteryForSearch, SearchCritery } from "./Catalog";
import { getFilteredRocks } from "../api/api";
type RockListProps = {
  name: String;
  handleAddToCart(r: Rock): void;
  search: SearchCritery;
};
const NUMBER_OF_PRODUCTS_SHOWN: number = 2;
//a
function Showcase(prefilteredbox: RockListProps): JSX.Element {
  const [rocks, setRocks] = useState<Rock[]>([]);

  var link: string;

  let mohsMin: number,
    mohsMax: number,
    densityMin: number,
    densityMax: number,
    priceMin: number,
    priceMax: number,
    nameSubstring: string,
    type: string;

  if (
    prefilteredbox.search.mohsMin !== undefined &&
    prefilteredbox.search.mohsMin !== null
  )
    mohsMin = prefilteredbox.search.mohsMin;
  else mohsMin = defaultCriteryForSearch.mohsMin;

  if (
    prefilteredbox.search.mohsMax !== undefined &&
    prefilteredbox.search.mohsMax !== null
  )
    mohsMax = prefilteredbox.search.mohsMax;
  else mohsMax = defaultCriteryForSearch.mohsMax;

  if (
    prefilteredbox.search.densityMin !== undefined &&
    prefilteredbox.search.densityMin !== null
  )
    densityMin = prefilteredbox.search.densityMin;
  else densityMin = defaultCriteryForSearch.densityMin;

  if (
    prefilteredbox.search.densityMax !== undefined &&
    prefilteredbox.search.densityMax !== null
  )
    densityMax = prefilteredbox.search.densityMax;
  else densityMax = defaultCriteryForSearch.densityMax;

  if (
    prefilteredbox.search.priceMin !== undefined &&
    prefilteredbox.search.priceMin !== null
  )
    priceMin = prefilteredbox.search.priceMin;
  else priceMin = defaultCriteryForSearch.priceMin;

  if (
    prefilteredbox.search.priceMax !== undefined &&
    prefilteredbox.search.priceMax !== null
  )
    priceMax = prefilteredbox.search.priceMax;
  else priceMax = defaultCriteryForSearch.priceMax;

  if (
    prefilteredbox.search.nameSubstring !== undefined &&
    prefilteredbox.search.nameSubstring !== null
  )
    nameSubstring = prefilteredbox.search.nameSubstring;
  else nameSubstring = defaultCriteryForSearch.nameSubstring;

  if (
    prefilteredbox.search.type !== undefined &&
    prefilteredbox.search.type !== null
  )
    type = prefilteredbox.search.type;
  else type = defaultCriteryForSearch.type;
  link =
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
  const refreshRockList = async () => {
    setRocks(
      await getFilteredRocks(
        mohsMin,
        mohsMax,
        densityMin,
        densityMax,
        priceMin,
        priceMax,
        nameSubstring,
        type
      )
    );
  };
  useEffect(() => {
    refreshRockList();
  }, []);
  return (
    <Card sx={{ height: "100%" }} variant="outlined">
      <div>
        <AppBar position="relative" className="titleOfShowcase">
          <p> {prefilteredbox.name}</p>
        </AppBar>

        <Grid container spacing={3} rowSpacing={7} padding={2}>
          {rocks.slice(0, NUMBER_OF_PRODUCTS_SHOWN).map((_, product) => {
            return (
              <Grid item xs={6} key={_.id}>
                <Product
                  product={rocks[product]}
                  handleAddToCart={prefilteredbox.handleAddToCart}
                  buyable={false}
                />
              </Grid>
            );
          })}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          sx={{ margin: "1em", marginTop: "3em", width: "96%" }}
          href={link}
        >
          Ver Mas
        </Button>
      </div>
    </Card>
  );
}

export default Showcase;
