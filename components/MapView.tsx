import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

const Map = dynamic(() => import('./MapLeaflet'), {
  ssr: false,
  loading: () => <Box sx={{ flex: 1 }}>Loading map...</Box>,
});

const MapView = (props) => {
  return <Map {...props} />;
};

export default MapView;
