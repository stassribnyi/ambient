import { FC } from 'react';
import { useUnitsConverter } from '../hooks';
import { Box } from '@mui/material';

export const Temperature: FC<Readonly<{ value: number }>> = ({ value }) => {
  const { convert } = useUnitsConverter();

  return (
    <Box component="span" sx={{ position: 'relative', display: 'inline-block' }}>
      {Math.floor(convert('temperature', value))}
      <Box component="span" sx={{ position: 'absolute', right: 0, transform: 'translateX(100%)' }}>
        °
      </Box>
    </Box>
  );
};
