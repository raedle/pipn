import React from 'react';
import { Container, Grid } from '@material-ui/core';

import VpnStatus from '../components/VpnStatus';
import ConnectButton from '../components/VpnConnectButton';
import DisconnectButton from '../components/VpnDisconnectButton';

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        spacing={2}
        alignItems="center">
        <Grid item>
          <VpnStatus />
        </Grid>
        <Grid item>
          <Grid container spacing={8}>
            <Grid item>
              <ConnectButton country="United_Kingdom" flag="GB" />
            </Grid>
            <Grid item>
              <ConnectButton country="Germany" flag="DE" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <DisconnectButton />
        </Grid>
      </Grid>
    </Container>
  );
}