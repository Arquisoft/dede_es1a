import "../css/LoginRegister.css";
import { Grid, Paper, Tooltip, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
type RegisterProps = {
    infoContent?: string,
    content: string,
};

function ProductViewData(props: RegisterProps): JSX.Element {


    return (
        <>

            <Paper sx={{ padding: '1em' }}>
                <Grid container>
                    {props.infoContent!==undefined ?
                        <>
                            <Grid item xs={1}>
                                <Tooltip title={props.infoContent} arrow>
                                    <InfoIcon sx={{ bottom: '100', position: 'relative' }} />
                                </Tooltip>

                            </Grid>
                            <Grid item xs={11}>
                                <Typography textAlign={'center'}>
                                    {props.content}
                                </Typography>
                            </Grid></> :
                        <Grid item xs={12}>
                            <Typography textAlign={'center'}>{props.content}</Typography>
                        </Grid>
                    }

                </Grid>
            </Paper>


        </>
    );

}

export default ProductViewData;
