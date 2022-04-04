import { AppBar, ListItemText } from '@mui/material';
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
        <AppBar position='relative' className="titleOfShowcase">
          <p> {prefilteredbox.name}</p>
        </AppBar>
        <div className="showcase">
        {
            prefilteredbox.rocks.map((_,product)=>{
                if(prefilteredbox.rocks[product]!==undefined)
                    return <Product key={_.id} product={prefilteredbox.rocks[product]} buyable={false}/>; 
                
            })
        }
        </div>
        
    </div>
    </>
  );
}

export default Showcase;
