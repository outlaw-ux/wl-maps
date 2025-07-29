import { MapContainer, TileLayer, ZoomControl, GeoJSON } from 'react-leaflet';
import { Box } from '@mui/material';
import UserLocationMarker from './UserLocationMarker';
import geoStreets from '../data/streets.json';

const bounds: L.LatLngBoundsExpression = [
  [38.091, -91.093], // Southwest corner
  [38.139, -91.048], // Northeast corner
];

const MapLeaflet = () => {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <MapContainer
        attributionControl={false}
        center={[38.11288, -91.06786]}
        zoom={14}
        minZoom={14}
        scrollWheelZoom={true}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="bottomright" />
        <GeoJSON data={geoStreets as GeoJSON.FeatureCollection} style={{ color: '#fff', weight: 0, opacity: 0 }}/>
        <UserLocationMarker />
      </MapContainer>
    </Box>
  );
};

export default MapLeaflet;
