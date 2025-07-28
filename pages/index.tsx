import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SidePanel from '../components/SidePanel';
import MapView from '../components/MapView';

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen(!open);

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <SidePanel open={open} onClose={toggle} />
      <Box sx={{ flex: 1, position: 'relative' }}>
        <IconButton
          onClick={toggle}
          sx={{ position: 'absolute', top: 16, left: 16, zIndex: 1000 }}
          aria-label="open filters"
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
