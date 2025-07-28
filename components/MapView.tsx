import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

const Map = dynamic(() => import('./RealMap'), {
  ssr: false,
  loading: () => <Box sx={{ flex: 1 }}>Loading map...</Box>,
});

export default function MapView() {
  return <Map />;
}
