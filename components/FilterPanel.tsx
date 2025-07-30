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
  Link,
} from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import type { Filters, IParcelsError } from '../types';
import { useIsMobile } from '../hooks/useIsMobile';

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  filter: Filters;
  setFilter: React.Dispatch<React.SetStateAction<Filters>>;
  filterErrors: IParcelsError;
  setFilterErrors: React.Dispatch<React.SetStateAction<IParcelsError>>;
}

const FilterPanel = ({
  open,
  onClose,
  filter,
  setFilter,
  filterErrors,
  setFilterErrors,
}: SidePanelProps) => {
  const [currentFilter, setCurrentFilter] = React.useState<Filters>(filter);

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
    if (!currentFilter.lot || !currentFilter.block || !currentFilter.section) {
      setFilterErrors((prevErr) => ({
        ...prevErr,
        incompleteAddress: true,
      }));
      return;
    }
    setFilterErrors((prevErr) => ({
      ...prevErr,
      incompleteAddress: false,
    }));
    setFilter(currentFilter);
  }, [currentFilter, onClose, setFilter]);

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      variant={isMobile ? 'temporary' : 'permanent'}
    >
      <Box sx={{ py: 2, height: 'inherit' }}>
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
                defaultValue={currentFilter.lot}
                label="Lot"
                type="number"
                size="small"
                onChange={(evt) => {
                  nextFilter('lot', evt.target.value);
                }}
                helperText={
                  filterErrors.incompleteAddress && !currentFilter.lot
                    ? 'Lot is required'
                    : ''
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
                helperText={
                  filterErrors.incompleteAddress && !currentFilter.block
                    ? 'Block is required'
                    : ''
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
                helperText={
                  filterErrors.incompleteAddress && !currentFilter.section
                    ? 'Section is required'
                    : ''
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
      </Box>
      {/* provide attribution to @project-osrm/osrm  */}
      <Box sx={{ p: 2, fontSize: '0.8rem', color: 'text.secondary' }}>
        <span>
          Map data ©{' '}
          <Link href="https://www.openstreetmap.org/copyright">
            OpenStreetMap
          </Link>
        </span>
        <br />
        <span>
          Routing data ©{' '}
          <Link href="https://project-osrm.org/">Project OSRM</Link>
        </span>
      </Box>
      {/* <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Layers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Layer options go here.
          </Typography>
        </AccordionDetails>
      </Accordion    on> */}
    </Drawer>
  );
};

export default FilterPanel;
