import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button } from '@material-ui/core';

const VPN_DISCONNECT = gql`
  mutation VpnDisconnect {
    disconnect
  }
`;

export default function VpnDisconnectButton() {
  const [disconnect, { loading }] = useMutation(VPN_DISCONNECT);

  return (
    <Button variant="contained" color="primary" disabled={loading} onClick={() => disconnect()}>
      Disconnect
    </Button>
  )
}