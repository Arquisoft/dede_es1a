import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Card, CardContent, Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import GetPodAddress from './GetPodAddress';

type Props = {
  logoutEnabled: boolean;
};

const ProfileViewer: React.FC<Props> = ({logoutEnabled}) => {
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
      {logoutEnabled ? 
        <LogoutButton >
          <Button style={{ marginTop: 20 }} variant="contained" color="primary">
            Logout
          </Button>
        </LogoutButton>
      : null}
      

    </Container>
  );
}

export default ProfileViewer