import { FC, PropsWithChildren } from 'react';
import { DialogContent, Box } from '@mui/material';

// TODO: use different name
export const DialogLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <DialogContent
      sx={{
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </DialogContent>
  );
};
