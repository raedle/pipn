import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid, Typography } from '@material-ui/core';

const VPN_STATUS = gql`
  query VpnStatus {
    status {
      status
      country
      city
    }
  }
`;

export default function VpnStatus() {
  const { loading, error, data } = useQuery(VPN_STATUS, {
    pollInterval: 3000,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :-( <pre>{JSON.stringify(error, null, 2)}</pre></p>;

  const {
    status,
    country,
    city,
  } = data.status;

  if (status === 'Connected') {
    if (country === null) {
      return (
        <Grid container>
          <Grid item xs={12} md={8} lg={4}>
            <Typography variant="h1" align="center" mt={4}>Connecting</Typography>
          </Grid>
        </Grid >
      );
    }
    return (
      <Grid container>
        <Grid item xs={12} md={8} lg={4}>
          <Typography variant="h1" align="center" mt={1}>{country}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2" align="center">{city}</Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container>
      <Grid item xs={12} md={8} lg={4}>
        <Typography variant="h1" align="center" mt={4}>{status}</Typography>
      </Grid>
    </Grid >
  );
}