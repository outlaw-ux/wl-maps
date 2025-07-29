import * as React from 'react';
import { Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FilterPanel from '../components/FilterPanel';
import MapView from '../components/MapView';
import { useEffect, useState } from 'react';
import type { Filters } from '../types';

export default function Container() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filters>({});
  const toggle = () => setOpen(!open);

  useEffect(() => {
    const searchParcels = async () => {
      console.log('Searching parcels with filter:', filter);
      if (filter.lot && filter.block && filter.section) {
        try {
          const params = new URLSearchParams({
            lot: filter.lot,
            block: filter.block,
            section: filter.section,
          });
          const response = await fetch(`/api/parcels?${params.toString()}`);
          console.log('Response status:', response);
          const data = await response.json();
          console.log('Parcels found:', data.items);
        } catch (error) {
          console.error('Parcel search error', error);
        }
      }
    };
    searchParcels();
  }, [filter]);

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <FilterPanel
        open={open}
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
          <MapView />
        </Box>
      </Box>
    </Box>
  );
}
