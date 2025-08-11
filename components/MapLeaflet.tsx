import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Box, Button } from '@mui/material';
import 'leaflet-routing-machine';
import UserLocationMarker from './UserLocationMarker';
import type { Parcel } from '../types';
import RoutingControl from './RoutingControl';
import LocateButton from './LocateMeButton';
import { bounds } from '../constants';

const MapLeaflet = ({
  destination,
  setDestination,
}: {
  readonly destination: Parcel | null;
  readonly setDestination: React.Dispatch<React.SetStateAction<Parcel | null>>;
}) => {
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
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; </a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        <UserLocationMarker navigating={!!destination} />
        <LocateButton />
        <RoutingControl destination={destination} />
        {destination && (
          <Button
            sx={{ position: 'absolute', bottom: 16, left: 16, zIndex: 1000 }}
            aria-label="cancel navigation"
            onClick={() => setDestination(null)}
            variant="contained"
            color="warning"
          >
            Cancel
          </Button>
        )}
      </MapContainer>
    </Box>
  );
};

export default MapLeaflet;
