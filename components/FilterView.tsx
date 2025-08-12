import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

const Filter = dynamic(() => import('./FilterPanel'), {
  ssr: false,
  loading: () => <Box sx={{ display: 'none' }}>Loading filters...</Box>,
});

const FilterView = (props) => {
  return <Filter {...props} />;
};

export default FilterView;
