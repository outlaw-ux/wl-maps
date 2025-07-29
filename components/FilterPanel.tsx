import * as React from 'react';
import {
  Drawer,
  IconButton,
  Accordion,
  // AccordionSummary,
  AccordionDetails,
  // Typography,
  TextField,
  Stack,
  Button,
  Alert,
  Box,
} from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import type { Filters } from '../types';
import { useIsMobile } from '../hooks/useIsMobile';

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  filter: Filters;
  setFilter: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterPanel = ({ open, onClose, filter, setFilter }: SidePanelProps) => {
  const [currentFilter, setCurrentFilter] = React.useState<Filters>(filter);
  const [hasError, setHasError] = React.useState(false);

  const isMobile = useIsMobile();

  const nextFilter = (key: string, value: string) => {
    setCurrentFilter(() => {
      return {
        ...currentFilter,
        [key]: value,
      };
    });
  };

  const handleNavigate = React.useCallback(() => {
    console.log('Navigating with filter:', currentFilter);
    if (!currentFilter.lot || !currentFilter.block || !currentFilter.section) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setFilter(currentFilter);
    onClose();
  }, [currentFilter, onClose, setFilter]);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant={isMobile ? 'temporary' : 'permanent'}
    >
      {isMobile && (
        <IconButton
          aria-label="close"
          sx={{ alignSelf: 'end', m: 1 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Accordion defaultExpanded>
        {/* <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Navigation</Typography>
        </AccordionSummary> */}
        <AccordionDetails>
          {hasError && (
            <Box sx={{ pb: 2 }}>
              <Alert severity="warning">Please fill in all fields.</Alert>
            </Box>
          )}
          <Stack spacing={2} sx={{ minWidth: 200 }}>
            <TextField
              autoFocus
              defaultValue={currentFilter.lot}
              label="Lot"
              type="number"
              size="small"
              onChange={(evt) => {
                nextFilter('lot', evt.target.value);
              }}
              error={hasError && !currentFilter.lot}
              helperText={
                hasError && !currentFilter.lot ? 'Lot is required' : ''
              }
            />
            <TextField
              defaultValue={currentFilter.block}
              label="Block"
              type="number"
              size="small"
              onChange={(evt) => {
                nextFilter('block', evt.target.value);
              }}
              error={hasError && !currentFilter.block}
              helperText={
                hasError && !currentFilter.block ? 'Block is required' : ''
              }
            />
            <TextField
              defaultValue={currentFilter.section}
              label="Section"
              type="number"
              size="small"
              onChange={(evt) => {
                nextFilter('section', evt.target.value);
              }}
              error={hasError && !currentFilter.section}
              helperText={
                hasError && !currentFilter.section ? 'Section is required' : ''
              }
            />

            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={handleNavigate}
            >
              Navigate
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Layers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Layer options go here.
          </Typography>
        </AccordionDetails>
      </Accordion> */}
    </Drawer>
  );
};

export default FilterPanel;
