import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, Container, Typography } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import GetPodAddress from './GetPodAddress';
import { Rock } from "../../shared/shareddtypes";

type Props = {
  cartContent: Rock[];
};

const ProfileViewer: React.FC<Props> = ({cartContent}) => {
  const { session } = useSession();

  return (
    <Container fixed>
      {session.info.webId ? (
        <CombinedDataProvider 
          datasetUrl={session.info.webId} 
          thingUrl={session.info.webId}>
        <Card style={{ maxWidth: 480 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Text property={FOAF.name.iri.value} />
            </Typography>
            <GetPodAddress webID={session.info.webId}></GetPodAddress>
          </CardContent>
        </Card>
      </CombinedDataProvider>
      ): null }
      <LogoutButton >
        <Button style={{ marginTop: 20 }} variant="contained" color="primary">
          Logout
        </Button>
      </LogoutButton>
      
      <Button
          size="medium"
          disableElevation
          variant="contained"
          disabled={cartContent.length === 0}
          href = "/payment"
      >
          BUY
      </Button>

    </Container>
  );
}

export default ProfileViewer