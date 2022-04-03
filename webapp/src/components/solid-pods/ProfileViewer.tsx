import { useSession, CombinedDataProvider, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardContent, Container, Typography } from "@material-ui/core";
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import GetPodAddress from './GetPodAddress';

const ProfileViewer = () => {
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
      

    </Container>
  );
}

export default ProfileViewer