import { ListItemText } from '@mui/material';
import { useState } from 'react';
import {Rock} from '../shared/shareddtypes';
import Product from './Product';
type RockListProps = {
  rocks: Rock[];
  name:String;
};

//a
function Showcase(prefilteredbox: RockListProps): JSX.Element {

    

    
  return (
    <>
    <div>
        <ListItemText className="titleOfShowcase" primary={prefilteredbox.name}/>
        <div className="showcase">
        {
            prefilteredbox.rocks.map((_,product)=>{
                if(prefilteredbox.rocks[product]!==undefined)
                    return <Product product={prefilteredbox.rocks[product]} buyable={false}/>; 
                
            })
        }
        </div>
    </div>
    </>
  );
}

export default Showcase;
