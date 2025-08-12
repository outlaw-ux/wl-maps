import * as React from 'react';
import { Box } from '@mui/material';
import MapView from '../components/MapView';
import { DestinationContextProvider } from '../contexts/DestinationProvider';
import FilterView from '../components/FilterView';

export default function Container() {
  return (
    <DestinationContextProvider>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <FilterView />
        <Box sx={{ flex: 1, position: 'relative' }}>
          <Box sx={{ height: '100%' }}>
            <MapView />
          </Box>
        </Box>
      </Box>
    </DestinationContextProvider>
  );
}
