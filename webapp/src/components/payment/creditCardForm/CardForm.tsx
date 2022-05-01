
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import { Alert, AlertColor, CardContent, Snackbar, TextField, Typography } from '@mui/material';
import { North } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { findConfigFile } from 'typescript';
import { isValidDateValue } from '@testing-library/user-event/dist/utils';


type Props = {
};

type NotificationType = {
    severity: AlertColor,
    message: string;
}

interface CheckStatus {
    isValid: boolean,
    message: string;
}

const CardForm: React.FC<Props> = ({}) => {
    
    const [nameCard, setNameCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvc, setCvc] = useState("");

    
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var resultCheckCard = checkCard();
        if (resultCheckCard[0]){
            setNotificationStatus(true);
            setNotification({ 
                severity:'success',
                message:'You have been registered in the system!'
            });
        }
        else{
            setNotificationStatus(true);
            setNotification({ 
                severity:'error',
                message: resultCheckCard[1].toString()
            });
        }
    }

    return (
        <div>
        <form name="loggin" onSubmit={handleSubmit}>
            <TextField
                required
                name="nameCard"
                label="Nombre del titular" 
                variant="outlined"
                value={nameCard}
                error = {true}
                helperText={ 'El campo no puede estar vacio' }
                onChange={e => processText(e.target.value, CHARACTERS_NO_NUMS, CARD_NAME_LENGHT,30,"",setNameCard)}
                
            />
            <TextField
                required
                name="CardNumber"
                label="Numero de targeta" 
                variant="outlined"
                value={cardNumber}
                error = {true}
                helperText={ 'El campo no puede estar vacio' }
                onChange={e => processText(e.target.value, NUMBERS, CARD_NUMBER_LENGHT,4,CARD_NUMBER_SEPARATOR,setCardNumber)}
            />
            <TextField
                required
                name="ExpDate"
                label="Fecha Vencimiento MM/AA" 
                variant="outlined"
                value={expDate}
                error = {true}
                helperText={ 'El campo no puede estar vacio' }
                onChange={e => processText(e.target.value, NUMBERS, CARD_EXP_DATE_LENGHT,2,DATE_SEPARATOR,setExpDate)}
            />
            <TextField
                required
                name="Cvc"
                label="CVC" 
                variant="outlined"
                value={cvc}
                error = {true}
                helperText={ 'El campo no puede estar vacio' }
                onChange={e => processText(e.target.value, NUMBERS, CARD_CVC_LENGHT,1,"",setCvc)}
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
        <Snackbar open={notificationStatus} autoHideDuration={3000} onClose={()=>{setNotificationStatus(false)}}>
            <Alert severity={notification.severity} sx={{ width: '100%' }}>
                {notification.message}
            </Alert>
        </Snackbar>
        </div>

    )

    function checkCard() {
        if( checkTextField(nameCard, CARD_NAME_LENGHT, "") ) return [false, " Nombre no válido"]
        if( checkTextField(cardNumber, CARD_NUMBER_LENGHT, CARD_NUMBER_SEPARATOR) ) return [false, " Numero targeta no válido"]
        if( checkDate(expDate) ) return [false, " fecha vencimiento no válida"]
        if( checkTextField(cvc, CARD_CVC_LENGHT, "") ) return [false, " cvc no válido"]
        return [true, ""]
    }
};

    const NUMBERS = "0123456789";
    const CHARACTERS_NO_NUMS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ ";
    const CARD_NUMBER_SEPARATOR = "-";
    const DATE_SEPARATOR = "/";
    const CARD_NAME_LENGHT = 30;
    const CARD_NUMBER_LENGHT = 16;
    const CARD_EXP_DATE_LENGHT = 4;
    const CARD_CVC_LENGHT = 3;

    function filterCharType(type: string, text: string, maxLength: number) {
        var filteredText = "";
        var nChar = 0;
        for (var i = 0; i < text.length && nChar < maxLength;i++) {
            if(type.includes(text[i])) {
                filteredText += text[i];
                nChar++;
            }
        }
        return filteredText;
    }


    function processText(text: string, type: string, maxLength: number, sectionLength: number, separatorChar: string, functionUsing: Function) {
        var filteredText = filterCharType(type, text.toUpperCase(), maxLength);
        var processedText = "";
        maxLength += maxLength/sectionLength -1;
        var numberOfsection = 0;
        for (var i = 0; i < filteredText.length ; i++) {
            processedText+=filteredText[i];
            numberOfsection++;
            if(i<(maxLength-sectionLength) && numberOfsection%sectionLength == 0) {
                processedText+=separatorChar;
            }   
        }
        functionUsing(processedText);
    }



    function checkDate(text: string) {
        const checkStatus:CheckStatus = checkTextField(text, CARD_EXP_DATE_LENGHT, DATE_SEPARATOR);
        
        if(! checkStatus.isValid ) return checkStatus; 

        var splited = text.split(DATE_SEPARATOR);
        if(parseInt(splited[0]) < 0 || parseInt(splited[0]) > 12 ) {
            checkStatus.isValid = false;
            checkStatus.message += "(campo mes no valido)";
            return checkStatus;
        }
        if(parseInt(splited[1]) < 22) {
            checkStatus.isValid = false;
            checkStatus.message += "(campo año no valido)";
            return checkStatus;
        }
        checkStatus.isValid = true;
        return checkStatus;
        
    }

    function checkTextField(text: string, lengthExpected: number, separatorChar: string) {
        const checkStatus:CheckStatus = { isValid: false, message: '' };

        if(text === "") {
            checkStatus.message = "(campo vacio)";
            return checkStatus;
        }
        
        var nChar = 0;
        for (var i = 0; i < text.length;i++) {
            if(text[i]!=separatorChar)    
                nChar++;
        }
        if(nChar!=lengthExpected) {
            checkStatus.message = "(formato no apropiado)";
            return checkStatus;
        }
        checkStatus.isValid = true;
        return checkStatus;
    }



export default CardForm;


