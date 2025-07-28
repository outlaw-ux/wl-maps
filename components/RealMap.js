import * as React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Box } from '@mui/material';

export default function RealMap() {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </Box>
  );
}
