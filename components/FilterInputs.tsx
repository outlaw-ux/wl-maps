import { Box, Alert, Stack, TextField, Button } from '@mui/material';
import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import L from 'leaflet';
import { IParcelsError } from '../types';
import { fetchLBS } from '../utils/fetchLBS';
import { parseGeometry } from '../utils/parseGeometry';
import { useDestinationContext } from '../contexts/DestinationProvider';

const FilterInputs = () => {
  const {
    setDestination,
    currentFilter,
    setCurrentFilter,
    setSidepanelOpen,
    setDestinationTitle,
  } = useDestinationContext();

  const [loading, setLoading] = React.useState(false);
  const [filterErrors, setFilterErrors] = React.useState<IParcelsError>({
    invalidAddress: false,
    incompleteAddress: false,
  });

  const nextFilter = (key: string, value: string) => {
    setCurrentFilter(() => {
      return {
        ...currentFilter,
        [key]: value,
      };
    });
  };

  const handleNavigate = React.useCallback(async () => {
    setLoading(true);
    if (
      !currentFilter?.lot ||
      !currentFilter?.block ||
      !currentFilter?.section
    ) {
      setFilterErrors({ incompleteAddress: true });
    } else {
      setFilterErrors({ incompleteAddress: false });
      const lbs = await fetchLBS(currentFilter);

      if (lbs.length === 0) {
        setFilterErrors({ invalidAddress: true });
      } else {
        setFilterErrors({ invalidAddress: false });
        // Assuming setDestination is a function to update the destination context
        const parsedDestination = parseGeometry(lbs[0].geometry);
        const latLng = L.latLng(parsedDestination[0], parsedDestination[1]);
        setDestination(latLng);
        setDestinationTitle(
          `${currentFilter.lot} — ${currentFilter.block} — ${currentFilter.section}`
        );
        //
        setSidepanelOpen(false);
      }
    }
    setLoading(false);
  }, [currentFilter]);

  return (
    <>
      {filterErrors.incompleteAddress && (
        <Box sx={{ pb: 2 }}>
          <Alert severity="warning">Please fill in all fields</Alert>
        </Box>
      )}
      {filterErrors.invalidAddress && (
        <Box sx={{ pb: 2 }}>
          <Alert severity="warning">Invalid property address</Alert>
        </Box>
      )}
      <Stack spacing={2} sx={{ minWidth: 200 }}>
        <TextField
          autoFocus
          defaultValue={currentFilter?.lot}
          label="Lot"
          type="string"
          slotProps={{ htmlInput: { inputMode: 'numeric' } }}
          size="small"
          onChange={(evt) => {
            nextFilter('lot', evt.target.value);
          }}
          helperText={
            filterErrors.incompleteAddress && !currentFilter?.lot
              ? 'Lot is required'
              : ''
          }
        />
        <TextField
          defaultValue={currentFilter?.block}
          label="Block"
          type="string"
          slotProps={{ htmlInput: { inputMode: 'numeric' } }}
          size="small"
          onChange={(evt) => {
            nextFilter('block', evt.target.value);
          }}
          helperText={
            filterErrors.incompleteAddress && !currentFilter?.block
              ? 'Block is required'
              : ''
          }
        />
        <TextField
          defaultValue={currentFilter?.section}
          label="Section"
          type="string"
          slotProps={{ htmlInput: { inputMode: 'numeric' } }}
          size="small"
          onChange={(evt) => {
            nextFilter('section', evt.target.value);
          }}
          helperText={
            filterErrors.incompleteAddress && !currentFilter?.section
              ? 'Section is required'
              : ''
          }
        />

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleNavigate}
          disabled={loading}
        >
          {loading ? 'Locating...' : 'Navigate'}
        </Button>
      </Stack>
    </>
  );
};

export default FilterInputs;
