import {Rock} from '../shared/shareddtypes';
import List from '@mui/material/List';
import Product from './Product';
import {Grid } from '@mui/material';
import RangeSlider from "./Rangeslider";
import BasicTextFieldWithOptions from "./TextFieldWithOptions";
import BasicTextField from "./TextField";
import  {getFilteredRocks} from '../api/api';
import { SetStateAction, useEffect, useState } from 'react';
type RockListProps = {
  handleAddToCart(rock:Rock): void;
};
const maxPossibleMohs=10
const minPossibleMohs=0
const maxPossibleDensity=30;
const minPossibleDensity=0;
const maxPossiblePrice=999;
const minPossiblePrice=0;
const anyNameRegex='';
//a
function Catalogo(rockListPros: RockListProps): JSX.Element {
  const [rocks, setRocks] = useState<Rock[]>([]);

  const [mohsMin,setMohsMin] = useState<Number>(minPossibleMohs)
  const [mohsMax,setMohsMax] = useState<Number>(maxPossibleMohs)
  const [densityMin,setDensityMin]= useState<Number>(minPossibleDensity)
  const [densityMax,setDensityMax]= useState<Number>(maxPossibleDensity)
  const [priceMin,setPriceMin] = useState<Number>(minPossiblePrice)
  const [pirceMax,setPriceMax] = useState<Number>(maxPossiblePrice)
  const [nameSubstring,setNameSubstring] = useState<string>(anyNameRegex)
  const refreshRockList = async () => {
    setRocks(await getFilteredRocks(mohsMin,mohsMax,densityMin,densityMax,priceMin,pirceMax,nameSubstring));
  };
  const changeMohs=(low:Number,high:Number)=>{
    setMohsMin(low)
    setMohsMax(high)
  }
  const changeDensity=(low:Number,high:Number)=>{
    setDensityMin(low)
    setDensityMax(high)
  }
  const changePrice=(low:Number,high:Number)=>{
    setPriceMin(low)
    setPriceMax(high) 
  }
  const changeNameSubstring=(event:React.ChangeEvent<HTMLInputElement>)=>{
    if(event==null)
      return
    setNameSubstring(event.currentTarget.value)
  }
  useEffect(() => {
    refreshRockList();
  }, []);

  return (
    <>
      <Grid id="catalogFilter" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={12/3}>
          <RangeSlider onValueChanged={changeMohs} max={0} min={100} valueName={'Mohs'}/>
        </Grid>
        <Grid item xs={12/3}>
          <RangeSlider max={0} min={100} valueName={'Densidad'}/>
        </Grid>
        <Grid item xs={12/3}>
          <RangeSlider max={0} min={100} valueName={'Precio'}/>
        </Grid>
        <Grid item xs={6}>
          <BasicTextFieldWithOptions values={["Metamorficas","Sedimentarias","Volcanicas"]} titleText={'Tipo de rocas'} helperText={'Selecciona el tipo de roca'}/>
        </Grid>
        <Grid item xs={6}>
          <BasicTextField onChange={changeNameSubstring} label={'Nombre'} placeholder={'Ej: Cuarcita'}/>
        </Grid>
      </Grid>
      <List id="catalog">
      {rocks.map((rock,index)=>{
        return <Product product={rock} buyable={true} handleAddToCart={rockListPros.handleAddToCart}/>
      })}
      </List>
      
    </>
  );
}


export default Catalogo;
