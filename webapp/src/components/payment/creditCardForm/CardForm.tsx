
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
    setCardIsValid: Function;
};

type NotificationType = {
    severity: AlertColor,
    message: string;
}

interface CheckStatus {
    isValid: boolean,
    message: string;
}

const CardForm: React.FC<Props> = ({setCardIsValid}) => {
    
    const [nameCard, setNameCard] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvc, setCvc] = useState("");

    
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        let checkStatus:CheckStatus = checkCard();
        if (checkStatus.isValid){
            setNotificationStatus(true);
            setNotification({ 
                severity:'success',
                message:'Targeta credito valida'
            });
        }
        else{
            setNotificationStatus(true);
            setNotification({ 
                severity:'error',
                message: checkStatus.message
            });
        }
        setCardIsValid(checkStatus.isValid);
    }

    return (
        <Grid container spacing={2} className='paymentpage-payment' >
        <form name="loggin" onSubmit={handleSubmit}>
            <Grid item xs={12}>
                <TextField sx={{ width: '25em' }}
                    required
                    name="nameCard"
                    label="Nombre del titular" 
                    variant="outlined"
                    margin="dense"
                    value={nameCard}
                    error = {nameCard===""}
                    helperText={ "" }
                    onChange={e => processText(e.target.value, CHARACTERS_NO_NUMS, CARD_NAME_LENGHT,30,"",setNameCard)}
                    
                />
            </Grid>
            <Grid item xs={12}>
                <TextField  sx={{ width: '25em'}}
                    required
                    name="CardNumber"
                    label="Numero de targeta" 
                    variant="outlined"
                    margin="dense"
                    value={cardNumber}
                    error = {cardNumber===""}
                    helperText={ "" }
                    onChange={e => processText(e.target.value, NUMBERS, CARD_NUMBER_LENGHT,4,CARD_NUMBER_SEPARATOR,setCardNumber)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    name="ExpDate"
                    label="Vencimiento MM/AA" 
                    variant="outlined"
                    margin="dense"
                    value={expDate}
                    error = {expDate===""}
                    helperText={ "" }
                    onChange={e => processText(e.target.value, NUMBERS, CARD_EXP_DATE_LENGHT,2,DATE_SEPARATOR,setExpDate)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    name="Cvc"
                    label="CVC" 
                    variant="outlined"
                    margin="dense"
                    value={cvc}
                    error = {cvc===""}
                    helperText={ "" }
                    onChange={e => processText(e.target.value, NUMBERS, CARD_CVC_LENGHT,1,"",setCvc)}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    size="medium"
                    disableElevation
                    variant="contained"
                    disabled={false}
                    type="submit"
                >
                    Validar
                </Button>
            </Grid>
            
            
            
           
        </form>
        <Snackbar open={notificationStatus} autoHideDuration={3000} onClose={()=>{setNotificationStatus(false)}}>
            <Alert severity={notification.severity} sx={{ width: '100%' }}>
                {notification.message}
            </Alert>
        </Snackbar>
        </Grid>

    )

    function checkCard() {
        //Check numero targeta
        let checkStatus:CheckStatus = checkTextField(cardNumber, CARD_NUMBER_LENGHT, CARD_NUMBER_SEPARATOR);
        if(!checkStatus.isValid) {
            checkStatus.message = "Numero targeta no válido" + checkStatus.message;
            return checkStatus;
        }

        //Check fecha targeta
        checkStatus = checkDate(expDate);
        if(!checkStatus.isValid) {
            checkStatus.message = "Fecha vencimiento no válida" + checkStatus.message;
            return checkStatus;
        }

        //Check cvc targeta
        checkStatus = checkTextField(cvc, CARD_CVC_LENGHT, "");
        if(!checkStatus.isValid) {
            checkStatus.message = "CVC no válido" + checkStatus.message;
            return checkStatus;
        }

        //Check nombre targeta
        if(nameCard.length<3) {
            checkStatus.isValid = false; 
            checkStatus.message = "Nombre no válido" + "(nombre muy corto, introduzca nombre completo)";
            return checkStatus;
        }

        checkStatus.isValid = true;
        return checkStatus;
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
            if(i<(maxLength-sectionLength) && numberOfsection%sectionLength === 0) {
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
            checkStatus.message = "(campo vacío)";
            return checkStatus;
        }
        
            var nChar = 0;
            for (var i = 0; i < text.length;i++) {
                if(text[i]!==separatorChar)    
                    nChar++;
            }

        if(nChar!==lengthExpected) {
            checkStatus.message = "(formato no válido)";
            return checkStatus;
        }
        checkStatus.isValid = true;
        return checkStatus;
    }



export default CardForm;


