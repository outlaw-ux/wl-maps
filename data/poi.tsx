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
      { name: 'Crystal', latlng: [38.1014233017808, -91.0660034927409] },
      { name: 'Del Lago', latlng: [38.109131780331225, -91.08500959486673] },
      { name: 'Del Vista', latlng: [38.109893461499254, -91.08994990946684] },
      { name: 'Emerald', latlng: [38.10167898218451, -91.07840440656386] },
      { name: 'Ruby', latlng: [38.12857202742274, -91.06317647918823] },
      { name: 'Woodland', latlng: [38.13563509139452, -91.0731906304379] },
      { name: 'Spring', latlng: [38.098105703356396, -91.04952827949673] },
      { name: 'Greens', latlng: [38.116282242762935, -91.06578015842311] },
      { name: 'Piney', latlng: [38.119164323170864, -91.08490945325124] },
      { name: 'Deer', latlng: [38.107049974060224, -91.05501572220032] },
      { name: 'Aspen', latlng: [38.105924659162845, -91.05998309668345] },
      { name: 'La Vista', latlng: [38.12514279957855, -91.08836778559879] },
      { name: 'Landolt', latlng: [38.11648124634653, -91.09133628033756] },
    ],
  },
  {
    label: 'Bathhouses',
    icon: <BathIcon fontSize="small" />,
    items: [
      { name: 'Northwoods', latlng: [38.11038203454678, -91.0660689806569] },
      {
        name: 'Crystal (including family)',
        latlng: [38.10106713456099, -91.06685019966542],
      },
      { name: 'Woodland', latlng: [38.13386623561187, -91.0755701343281] },
      { name: 'Ruby', latlng: [38.131302681493665, -91.06052765294282] },
      { name: 'Del Lago', latlng: [38.110080579375825, -91.0854210051726] },
      { name: 'Emerald', latlng: [38.099570649193296, -91.07618310759091] },
      { name: 'Graystone', latlng: [38.12875913143606, -91.0818091051926] },
    ],
  },
  {
    label: 'Woodland Buildings',
    icon: <BuildingIcon fontSize="small" />,
    items: [
      {
        name: 'Community Center',
        latlng: [38.10158641158666, -91.06761076338925],
      },
      { name: 'Pool', latlng: [38.101862841137766, -91.06706578391052] },
      { name: 'Office', latlng: [38.10367730640526, -91.05060072777904] },
      { name: 'Gate', latlng: [38.103940062192976, -91.05072749635292] },
      {
        name: 'Maintenance Shed',
        latlng: [38.11015213108947, -91.06783193248792],
      },
    ],
  },
  {
    label: 'Dumpsters',
    icon: <DeleteIcon fontSize="small" />,
    items: [
      { name: 'Gate', latlng: [38.103418170235706, -91.05007090050039] },
      { name: 'Northwoods', latlng: [38.110208316122076, -91.06671123131426] },
      {
        name: 'Woodland Bathhouse',
        latlng: [38.13376006838158, -91.07547334318757],
      },
    ],
  },
  {
    label: 'Parks',
    icon: <ParkIcon fontSize="small" />,
    items: [
      { name: 'Graystone', latlng: [38.12822643329577, -91.08257323516757] },
      {
        name: 'Crystal Lake',
        latlng: [38.097939718479026, -91.05517364190153],
      },
      {
        name: 'Del Lago Lake',
        latlng: [38.10778290106453, -91.09048320910594],
      },
      {
        name: 'Woodland Lake',
        latlng: [38.13607573403036, -91.07247533840456],
      },
    ],
  },
  {
    label: 'Other Locations',
    icon: <AddLocationAlt fontSize="small" />,
    items: [
      {
        name: 'Lil Bit of Something Country Store',
        latlng: [38.10692321885244, -91.05189641128791],
      },
      { name: 'Helipad', latlng: [38.100619743750855, -91.06643546942091] },
    ],
  },
];
