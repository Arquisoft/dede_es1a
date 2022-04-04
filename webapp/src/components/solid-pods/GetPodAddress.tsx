import React, {useEffect } from 'react';

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"

import {VCARD } from "@inrupt/vocab-common-rdf";
import {getSolidDataset, getStringNoLocale, getThing, Thing, getUrl} from "@inrupt/solid-client";

type PODProps = {
    webID: string;
};

async function infoAddress(webID: string): Promise<string[]> {
    let profileDocumentURI = webID.split("#")[0]
    let myDataSet = await getSolidDataset(profileDocumentURI)
    let profile = getThing(myDataSet, webID)
    let urlAddress = getUrl(profile as Thing, VCARD.hasAddress) as string
    let addressProfile = await getThing(myDataSet, urlAddress)

    let address = getStringNoLocale(addressProfile as Thing, VCARD.street_address) as string
    let postalCode = getStringNoLocale(addressProfile as Thing, VCARD.postal_code) as string
    let city = getStringNoLocale(addressProfile as Thing, VCARD.locality) as string

    let info = [address, postalCode, city]

    return info
}

function GetPodAddress(props: PODProps): JSX.Element {
    
    const [info, setInfo] = React.useState<string[]>([]);
    const getInfoAddress = async () => setInfo(await infoAddress(props.webID));

    useEffect(() => {
        getInfoAddress();
    })

  return (
    <Grid container>
        <Grid>
            <Box component="p">Dirección: {info[0]}</Box>
            <Box component="p">Codigo Postal: {info[1]}</Box>
            <Box component="p">Ciudad: {info[2]}</Box>
        </Grid>
    </Grid>
  )
}

export default GetPodAddress;