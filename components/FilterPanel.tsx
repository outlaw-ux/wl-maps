import * as React from 'react';
import {
  Drawer,
  IconButton,
  Accordion,
  AccordionDetails,
  Stack,
  Button,
  AccordionSummary,
  ListItem,
  ListItemText,
  Typography,
  List,
} from '@mui/material';
import L from 'leaflet';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { useIsMobile } from '../hooks/useIsMobile';
import { pois } from '../data/poi';
import { useDestinationContext } from '../contexts/DestinationProvider';
import FilterInputs from './FilterInputs';

const FilterPanel = () => {
  const [expandedSection, setExpandedSection] = React.useState<
    string | undefined
  >();

  const { setDestination, sidepanelOpen, setSidepanelOpen,setDestinationTitle } =
    useDestinationContext();

  const isMobile = useIsMobile();

  return (
    <Drawer anchor="left" variant={isMobile ? 'temporary' : 'permanent'} open={sidepanelOpen} onClose={() => setSidepanelOpen(false)}>
      {isMobile && (
        <IconButton
          aria-label="close"
          sx={{ alignSelf: 'end', m: 1 }}
          onClick={() => {
            setSidepanelOpen(false);
          }}
        >
          <CloseIcon />
        </IconButton>
      )}
      <Accordion defaultExpanded>
        <AccordionDetails>
          <FilterInputs />
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
                        const latLng = L.latLng(
                          item.latlng[0],
                          item.latlng[1]
                        );
                        setDestination(latLng);
                        setDestinationTitle(`${item.name} ${poi.label}`);
                        setSidepanelOpen(false);
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
