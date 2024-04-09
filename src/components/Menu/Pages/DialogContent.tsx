import { FC, PropsWithChildren } from 'react';
import { DialogContent as Content, Box } from '@mui/material';

export const DialogContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Content
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
    </Content>
  );
};
