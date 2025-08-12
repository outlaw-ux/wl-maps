import * as React from 'react';
import { Box } from '@mui/material';
import { get } from 'idb-keyval';
import MapView from '../components/MapView';
import { DestinationContextProvider } from '../contexts/DestinationProvider';
import FilterView from '../components/FilterView';
import TermsDialog from '../components/TermsDialog';
import { TERMS_KEY } from '../utils/constants';

export default function Container() {
  const [needsTos, setNeedsTos] = React.useState(false);

  React.useEffect(() => {
    const checkAccepted = async () => {
      if (typeof window === 'undefined') return;
      const accepted = await get(TERMS_KEY);
      if (!accepted) {
        setNeedsTos(true);
      }
    };
    void checkAccepted();
  }, []);

  return (
    <DestinationContextProvider>
      {needsTos ? (
        <TermsDialog setNeedsTos={setNeedsTos} />
      ) : (
        <Box sx={{ display: 'flex', height: '100%' }}>
          <FilterView />
          <Box sx={{ flex: 1, position: 'relative' }}>
            <Box sx={{ height: '100%' }}>
              <MapView />
            </Box>
          </Box>
        </Box>
      )}
    </DestinationContextProvider>
  );
}
