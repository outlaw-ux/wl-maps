import * as React from "react";
import {
  Drawer,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

const FilterPanel = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <IconButton
        onClick={onClose}
        aria-label="close"
        sx={{ alignSelf: "end", m: 1 }}>
        <CloseIcon />
      </IconButton>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2} sx={{ minWidth: 200 }}>
            <TextField label="Lot" type="number" size="small" />
            <TextField label="Block" type="number" size="small" />
            <TextField label="Section" type="number" size="small" />
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Layers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Layer options go here.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Drawer>
  );
};

export default FilterPanel;
