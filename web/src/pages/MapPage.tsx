import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import VpnConnectButton from '../components/VpnConnectButton';
import { Typography } from '@material-ui/core';

let DefaultIcon = L.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

type CountryInfosQuery = {
  countryInfos: VpnCountry[],
}

type VpnCity = {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

type VpnCountry = {
  id: number,
  name: string,
  code: string,
  cities: VpnCity[],
}

const COUNTRY_INFOS = gql`
  query CountryInfos {
    countryInfos {
      id
      name
      code
      cities {
        id
        name
        latitude
        longitude
      }
    }
  }
`;

export default function MapPage() {
  const { loading, error, data } = useQuery<CountryInfosQuery>(COUNTRY_INFOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :-( <pre>{JSON.stringify(error, null, 2)}</pre></p>;

  const { countryInfos } = data!;

  return (
    <MapContainer center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {countryInfos.map(country => {
        return country.cities.map(city => {
          return (
            <Marker key={city.id} position={[city.latitude, city.longitude]}>
              <Popup>
                <Typography variant="overline">{city.name}, {country.name}</Typography>
                <VpnConnectButton
                  city={city.name}
                  country={country.name} />
              </Popup>
            </Marker>
          )
        })
      })}
    </MapContainer>
  )
}