import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import prettyMilliseconds from "pretty-ms";

const VPN_STATUS_DETAILS = gql`
  query VpnStatusDetails {
    status {
      status
      server
      country
      city
      serverIP
      technology
      protocol
      received
      receivedUnit
      sent
      sentUnit
      uptime
    }
  }
`;

export default function StatusPage() {
  const { loading, error, data } = useQuery(VPN_STATUS_DETAILS, {
    pollInterval: 10000,
  });

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <p>
        Error :-( <pre>{JSON.stringify(error, null, 2)}</pre>
      </p>
    );

  const {
    status,
    server,
    country,
    city,
    serverIP,
    technology,
    protocol,
    received,
    receivedUnit,
    sent,
    sentUnit,
    uptime,
  } = data.status;

  if (status !== "Connected") {
    return (
      <Container maxWidth="md">
        <Grid container direction="column" spacing={2} alignItems="center">
          <Grid item xs={12} md={8} lg={4}>
            <Typography variant="h1" mt={4}>
              {status}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Grid container direction="column" spacing={2} alignItems="center">
        <Grid container>
          <Grid item xs={12} md={8} lg={4}>
            <Typography variant="h1" align="center" mt={1}>
              {country}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" align="center">
              {city}
            </Typography>
          </Grid>
        </Grid>
        <Box>Server: {server}</Box>
        <Box>Server IP: {serverIP}</Box>
        <Box>Technology: {technology}</Box>
        <Box>Protocol: {protocol}</Box>
        <Box>
          Received: {received} {receivedUnit}
        </Box>
        <Box>
          Sent: {sent} {sentUnit}
        </Box>
        <Box>Uptime: {prettyMilliseconds(uptime)}</Box>
      </Grid>
    </Container>
  );
}
