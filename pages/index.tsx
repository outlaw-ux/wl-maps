import * as React from 'react';
import { Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FilterPanel from '../components/FilterPanel';
import MapView from '../components/MapView';
import { useEffect, useState } from 'react';
import type { Filters, IParcelsError, Parcel } from '../types';
import { fetchLBS } from '../utils/fetchLBS';

export default function Container() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filters>({});
  const [poiDestination, setPoiDestination] = useState<[number, number] | null>(
    null
  );
  const [filterErrors, setFilterErrors] = useState<IParcelsError>({
    invalidAddress: false,
    incompleteAddress: false,
  });
  const [destination, setDestination] = useState<Parcel | null>(null);
  const toggle = () => setOpen(!open);

  useEffect(() => {
    const searchParcels = async () => {
      if (filter.lot && filter.block && filter.section) {
        const res = await fetchLBS(filter);
        if (res.length === 0) {
          setFilterErrors({ invalidAddress: true });
        } else {
          setDestination(res[0]);
          setFilterErrors({ invalidAddress: false });
          setOpen(false);
        }
      }
    };
    searchParcels();
  }, [filter]);

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <FilterPanel
        open={open}
        filterErrors={filterErrors}
        setFilterErrors={setFilterErrors}
        filter={filter}
        setFilter={setFilter}
        onClose={toggle}
        setPoiDestination={setPoiDestination}
      />
      <Box sx={{ flex: 1, position: 'relative' }}>
        {!destination && (
          <Button
            sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1000 }}
            aria-label="open filters"
            onClick={toggle}
            variant="contained"
            color="secondary"
          >
            <MenuIcon />
          </Button>
        )}
        <Box sx={{ height: '100%' }}>
          <MapView destination={destination} poiDestination={poiDestination} />
          {destination && (
            <Button
              sx={{ position: 'absolute', bottom: 16, left: 16, zIndex: 1000 }}
              aria-label="cancel navigation"
              onClick={() => {
                setDestination(null);
                setFilter({});
              }}
              variant="contained"
              color="warning"
            >
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
