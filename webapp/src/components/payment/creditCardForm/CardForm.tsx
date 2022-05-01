
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import { CardContent, TextField, Typography } from '@mui/material';
import { North } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { findConfigFile } from 'typescript';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';


type Props = {
};

const CardForm: React.FC<Props> = ({}) => {
    
  const [cardNumber, setCardNumber] = useState('');
  const [nameCard, setNameCard] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvc, setCvc] = useState("");

    function checkCard() {
        var isValid = false;

        

        return isValid;
    }


    return (
        <form name="loggin" onSubmit={checkCard}>
            <TextField
                required
                name="nameCard"
                label="Nombre del titular" 
                variant="outlined"
                value={nameCard}
                error = {true}
                helperText={ 'El campo no puede estar vacio' }
                onChange={e => processText(e.target.value, CHARACTERS_NO_NUMS, 20,20,"",setNameCard)}
                
            />
            <TextField
                required
                name="CardNumber"
                label="Numero de targeta" 
                variant="outlined"
                value={cardNumber}
                error = {true}
                helperText={ 'El campo no puede estar vacio' }
                onChange={e => processText(e.target.value, NUMBERS, 8,4,"-",setCardNumber)}
            />
            <TextField
                required
                name="ExpDate"
                label="Fecha Vencimiento" 
                variant="outlined"
                value={expDate}
                error = {true}
                helperText={ 'El campo no puede estar vacio' }
                onChange={e => processText(e.target.value, NUMBERS, 4,2,"/",setExpDate)}
                // onChange={e => filterCharType(DATE, e.target.value, setExpDate)}
            />
            <TextField
                required
                name="Cvc"
                label="CVC" 
                variant="outlined"
                value={cvc}
                error = {true}
                helperText={ 'El campo no puede estar vacio' }
                // onChange={e => filterCharType(NUMBERS, e.target.value, setCvc)}
            />
            <Button
                size="medium"
                disableElevation
                variant="contained"
                disabled={false}
                type="submit"
            >
                Validar
            </Button>
        </form>
       

    )
};

const NUMBERS = "0123456789";
const CHARACTERS_NO_NUMS = "abcdefghijklmnñopqrstuvwxyz ";

function filterCharType(type: string, text: string, maxLength: number) {
    var filteredText = "";
    for (var i = 0; i < type.length && i < maxLength; i++) {
        if(type.includes(text[i]))
            filteredText += text[i];
    }
    return filteredText;
}


function processText(text: string, type: string, maxLength: number, sectionLength: number, separatorChar: string, functionUsing: Function) {
    var filteredText = filterCharType(type, text, maxLength);
    var processedText = "";
    var numberOfsection = 0;
    for (var i = 0; i < filteredText.length; i++) {
        numberOfsection++;
        processedText+=filteredText[i];

        if(i>0 && numberOfsection%sectionLength === 0) {
            processedText+=separatorChar;
            i+=1;
            numberOfsection--;
        }   
    }

    //     if(filteredText[i]==separatorChar){
    //         i--;
    //         continue;
    //     }
    //     if(type.includes(text[i])) {
    //         if(i>0 && i%sectionLength === 0)
    //             filteredText += separatorChar;
    //         filteredText += text[i];
    //     }
    // }
      
    functionUsing(processedText);
}



export default CardForm;


