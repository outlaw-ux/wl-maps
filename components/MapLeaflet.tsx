import { MapContainer, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet';
import { Box } from '@mui/material';
import UserLocationMarker from './UserLocationMarker';
import geoStreets from '../data/streets.json';

const bounds: L.LatLngBoundsExpression = [
  [38.091, -91.093], // Southwest corner
  [38.139, -91.048], // Northeast corner
];

const MapLeaflet = () => {
  //   useEffect(() => {
  //   if (navigator.geolocation && map) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       setUserLocation(new L.LatLng(latitude, longitude));
  //       const icon = L.icon({
  //         iconUrl: '/property-marker.svg',
  //         iconSize: [24, 24],
  //       });
  //       L.marker([latitude, longitude], {
  //         icon,
  //       })
  //         .addTo(map)
  //         .bindPopup('Your Location')
  //         .openPopup();
  //       map.setView([latitude, longitude], 15);
  //     });
  //   }
  // }, [map]);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <MapContainer
        attributionControl={false}
        center={[38.11288, -91.06786]}
        zoom={14}
        scrollWheelZoom={true}
        minZoom={14}
        maxZoom={19}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="bottomright" />
        <GeoJSON data={geoStreets as GeoJSON.FeatureCollection} />
        <UserLocationMarker />
      </MapContainer>
    </Box>
  );
};

export default MapLeaflet;
