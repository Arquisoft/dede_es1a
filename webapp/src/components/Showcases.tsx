import { Rock } from "../shared/shareddtypes";
import Showcase from "./Showcase";
import { Grid } from "@mui/material";
import { SearchCritery } from "./Filter";

type RockListProps = {
  handleAddToCart(r: Rock): void;
};

export const LIST_OF_CRITERIES: SearchCritery[] = [
  { type: "sedimentaria" },
  { type: "metamórfica" },
  {type: "ígnea"},
  {type: ""}
];
export const LIST_OF_NAMES:string[]=[
  "Sedimentarias",
  "Metamórficas",
  "Volcánicas",
  "Las Mas Vendidas!"
]

function Showcases(prefilteredbox: RockListProps): JSX.Element {

  return (
    <>
      <Grid container spacing={3}>
        {
        LIST_OF_CRITERIES.map((value,index)=>
        <Grid item xs={6} key={index}>
            <Showcase
              key={index}
              name={LIST_OF_NAMES[index]}
              handleAddToCart={prefilteredbox.handleAddToCart}
              search={value}
            />
          </Grid>
        )
          }
      </Grid>
    </>
  );
}
export default Showcases;
