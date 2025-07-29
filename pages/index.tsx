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
          setFilterErrors((prevErr) => ({ ...prevErr, invalidAddress: true }));
        } else {
          setDestination(res[0]);
          setFilterErrors((prevErr) => ({ ...prevErr, invalidAddress: false }));
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
      />
      <Box sx={{ flex: 1, position: 'relative' }}>
        <Button
          sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1000 }}
          aria-label="open filters"
          onClick={toggle}
          variant="contained"
          color="secondary"
        >
          <MenuIcon />
        </Button>
        <Box sx={{ height: '100%' }}>
          <MapView destination={destination} setDestination={setDestination} />
        </Box>
      </Box>
    </Box>
  );
}
