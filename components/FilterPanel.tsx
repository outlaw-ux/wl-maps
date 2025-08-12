import * as React from 'react';
import {
  Drawer,
  IconButton,
  Accordion,
  AccordionDetails,
  TextField,
  Stack,
  Button,
  Alert,
  Box,
  AccordionSummary,
  ListItem,
  ListItemText,
  Typography,
  List,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import type { Filters, IParcelsError } from '../types';
import { useIsMobile } from '../hooks/useIsMobile';
import { pois } from '../data/poi';

interface SidePanelProps {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly filter: Filters;
  readonly setFilter: React.Dispatch<React.SetStateAction<Filters>>;
  readonly filterErrors: IParcelsError;
  readonly setFilterErrors: React.Dispatch<React.SetStateAction<IParcelsError>>;
  readonly setPoiDestination?: React.Dispatch<
    React.SetStateAction<[number, number] | null>
  >;
}

const FilterPanel = ({
  open,
  onClose,
  filter,
  setFilter,
  filterErrors,
  setFilterErrors,
  setPoiDestination,
}: SidePanelProps) => {
  const [currentFilter, setCurrentFilter] = React.useState<Filters | null>(
    filter
  );
  const [expandedSection, setExpandedSection] = React.useState<
    string | undefined
  >();

  React.useEffect(() => {
    setCurrentFilter((prev) => {
      if (JSON.stringify(filter) !== JSON.stringify(prev)) {
        return filter;
      }
      return prev;
    });
  }, [filter]);

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
    if (
      !currentFilter?.lot ||
      !currentFilter?.block ||
      !currentFilter?.section
    ) {
      setFilterErrors({ incompleteAddress: true });
      return;
    } else {
      setFilterErrors({ incompleteAddress: false });
      setFilter(currentFilter);
    }
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
              defaultValue={currentFilter?.lot}
              label="Lot"
              type="string"
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
              type="number"
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
              type="number"
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
            >
              Navigate
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {pois.map((poi) => (
        <Accordion
          key={poi.label}
          expanded={expandedSection === poi.label}
          onChange={(_, isExpanded) =>
            setExpandedSection(isExpanded ? poi.label : undefined)
          }
          disableGutters
          elevation={0}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Stack direction="row" alignItems="center" spacing={1}>
              {poi.icon}
              <Typography fontWeight="bold">{poi.label}</Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <List dense disablePadding>
              {poi.items.map((item) => (
                <ListItem
                  key={item.name}
                  disableGutters
                  secondaryAction={
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        setPoiDestination?.(item.latlng);
                        onClose();
                      }}
                    >
                      GO
                    </Button>
                  }
                >
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Drawer>
  );
};

export default FilterPanel;
