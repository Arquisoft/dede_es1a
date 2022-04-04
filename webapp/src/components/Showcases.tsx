import { useEffect, useState } from "react";
import { getRocksFiery, getRocksMetamorphic, getRocksSedimentary } from "../api/api";
import { Rock } from "../shared/shareddtypes";
import Showcase from "./Showcase";
import prefilters from "../code/Prefilters"

function Showcases() {
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
          return (<Showcase key={element} rocks={prefilteredRocks[element]} name={nameOfFilters[element]}/>); 
        })}
        
    </>
  );
}
export default Showcases