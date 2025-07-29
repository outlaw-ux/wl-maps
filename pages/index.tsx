import * as React from 'react';
import { Box, IconButton } from '@mui/material';
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
    if (filter.lot && filter.block && filter.section) {
      // Logic to handle when all filters are set
      console.log('Filters applied:', filter);
    }
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
        <IconButton
          sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1000 }}
          aria-label="open filters"
          onClick={toggle}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ height: '100%' }}>
          <MapView />
        </Box>
      </Box>
    </Box>
  );
}
