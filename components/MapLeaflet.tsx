import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import 'leaflet-routing-machine';
import UserLocationMarker from './UserLocationMarker';
import RoutingControl from './RoutingControl';
import LocateButton from './LocateMeButton';
import { useDestinationContext } from '../contexts/DestinationProvider';

const MapLeaflet = () => {
  const { destination, setDestination, setSidepanelOpen, setDestinationTitle } =
    useDestinationContext();

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <MapContainer
        attributionControl={false}
        center={[38.11288, -91.06786]}
        zoom={14}
        minZoom={14}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        {!destination ? (
          <Button
            sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1000 }}
            aria-label="open filters"
            onClick={() => {
              setSidepanelOpen(true);
            }}
            variant="contained"
            color="secondary"
          >
            <MenuIcon />
          </Button>
        ) : (
          <Button
            sx={{
              position: 'absolute',
              bottom: 16,
              left: 16,
              zIndex: 1000,
            }}
            aria-label="cancel navigation"
            onClick={() => {
              setDestination(null);
              setDestinationTitle('');
            }}
            variant="contained"
            color="warning"
          >
            Cancel
          </Button>
        )}
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
        <ZoomControl position="bottomright" />
        <UserLocationMarker />
        <LocateButton />
        <RoutingControl />
      </MapContainer>
    </Box>
  );
};

export default MapLeaflet;
