import LakeIcon from '@mui/icons-material/Waves';
import BathIcon from '@mui/icons-material/Bathtub';
import BuildingIcon from '@mui/icons-material/Business';
import DeleteIcon from '@mui/icons-material/Delete';
import ParkIcon from '@mui/icons-material/Park';
import AddLocationAlt from '@mui/icons-material/AddLocationAlt';

type POIItem = {
  name: string;
  latlng: [number, number];
};

type POISection = {
  label: string;
  icon: React.ReactNode;
  items: POIItem[];
};

export const pois: POISection[] = [
  {
    label: 'Lakes',
    icon: <LakeIcon fontSize="small" />,
    items: [
      { name: 'Crystal', latlng: [38.101, -91.051] },
      { name: 'Del Lago', latlng: [38.102, -91.052] },
      { name: 'Del Vista', latlng: [38.103, -91.053] },
      { name: 'Emerald', latlng: [38.104, -91.054] },
      { name: 'Ruby', latlng: [38.105, -91.055] },
      { name: 'Woodland', latlng: [38.106, -91.056] },
      { name: 'Spring', latlng: [38.107, -91.057] },
      { name: 'Greens', latlng: [38.108, -91.058] },
      { name: 'Piney', latlng: [38.109, -91.059] },
      { name: 'Deer', latlng: [38.11, -91.06] },
      { name: 'Aspen', latlng: [38.111, -91.061] },
      { name: 'La Vista', latlng: [38.112, -91.062] },
      { name: 'Landolt', latlng: [38.113, -91.063] },
    ],
  },
  {
    label: 'Bathhouses',
    icon: <BathIcon fontSize="small" />,
    items: [
      { name: 'Northwoods', latlng: [38.201, -91.101] },
      { name: 'Crystal (including family)', latlng: [38.202, -91.102] },
      { name: 'Woodland', latlng: [38.203, -91.103] },
      { name: 'Ruby', latlng: [38.204, -91.104] },
      { name: 'Del Lago', latlng: [38.205, -91.105] },
      { name: 'Emerald', latlng: [38.206, -91.106] },
      { name: 'Graystone', latlng: [38.207, -91.107] },
    ],
  },
  {
    label: 'Woodland Buildings',
    icon: <BuildingIcon fontSize="small" />,
    items: [
      { name: 'Community Center', latlng: [38.301, -91.201] },
      { name: 'Office', latlng: [38.302, -91.202] },
      { name: 'Gate', latlng: [38.303, -91.203] },
      { name: 'Maintenance Shed', latlng: [38.304, -91.204] },
    ],
  },
  {
    label: 'Dumpsters',
    icon: <DeleteIcon fontSize="small" />,
    items: [
      { name: 'Gate', latlng: [38.401, -91.301] },
      { name: 'Northwoods', latlng: [38.402, -91.302] },
      { name: 'Woodland Bathhouse', latlng: [38.403, -91.303] },
    ],
  },
  {
    label: 'Parks',
    icon: <ParkIcon fontSize="small" />,
    items: [
      { name: 'Graystone', latlng: [38.501, -91.401] },
      { name: 'Crystal Lake', latlng: [38.502, -91.402] },
      { name: 'Del Lago Lake', latlng: [38.503, -91.403] },
      { name: 'Woodland Lake', latlng: [38.504, -91.404] },
    ],
  },
  {
    label: 'Other Locations',
    icon: <AddLocationAlt fontSize="small" />,
    items: [
      { name: 'Lil Bit of Something Country Store', latlng: [38.601, -91.501] },
      { name: 'The Creek', latlng: [38.602, -91.502] },
      { name: 'Helipad', latlng: [38.603, -91.503] },
    ],
  },
];
