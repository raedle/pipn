import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { Backdrop, Button, ButtonBase, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ReactCountryFlag from 'react-country-flag';

const useStyles = makeStyles(({
  backdrop: {
    position: 'absolute',
    // z-index: 1050 is just enough to cover the radial menu
    zIndex: 1050,
  },
}));

const VPN_CONNECT = gql`
  mutation VpnConnect($country: String, $city: String) {
    connect(country: $country, city: $city)
  }
`;

type Props = {
  city?: string,
  country: string,
  flag?: string,
}

export default function VpnConnectButton({ country, city, flag }: Props) {
  const styles = useStyles();
  const [connect, { loading }] = useMutation(VPN_CONNECT);

  const connectionLabel = React.useMemo(() => {
    let label = "";
    if (city != null) {
      label += `${city.replace(/_/g, ' ')}, `;
    }
    if (country != null) {
      label += `${country.replace(/_/g, ' ')}`;
    }
    return label;
  }, [country, city]);

  function handleConnect() {
    connect({
      variables: {
        country,
        city,
      }
    });
  }

  return (
    <>
      {flag != null ?
        (
          <ButtonBase
            focusRipple
            onClick={handleConnect}>
            <ReactCountryFlag
              countryCode={flag}
              svg
              style={{
                fontSize: '10em',
              }}
              aria-label={country} />
          </ButtonBase>
        )
        :
        (
          <Button onClick={handleConnect}>
            Connect to {connectionLabel}
          </Button>
        )
      }
      <Backdrop className={styles.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}