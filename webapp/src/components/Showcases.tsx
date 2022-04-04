import { useEffect, useState } from "react";
import { getRocksFiery, getRocksMetamorphic, getRocksSedimentary } from "../api/api";
import { Rock } from "../shared/shareddtypes";
import Showcase from "./Showcase";
import prefilters from "../code/Prefilters"

type RockListProps = {
  handleAddToCart(r:Rock): void;
};

function Showcases(prefilteredbox: RockListProps): JSX.Element {
    const [prefilteredRocks,setPrefilteredRocks] = useState<Rock[][]>([]);
    const [nameOfFilters,setNameOfFilters]=useState<String[]>([]);
    
    
    useEffect(()=>{
        const refreshRockList = async () => {
            
            setPrefilteredRocks([...prefilteredRocks,await getRocksMetamorphic(),await getRocksSedimentary(),await getRocksFiery()])
            setNameOfFilters(prefilters)
          }
      refreshRockList();
      
    },[]);
  return (
    <>
        
        {prefilteredRocks.map((_, element) => {
            
            return (<Showcase key={element} rocks={prefilteredRocks[element]} name={nameOfFilters[element]} handleAddToCart={prefilteredbox.handleAddToCart}/>); 
            
        })}
        
    </>
  );
}
export default Showcases