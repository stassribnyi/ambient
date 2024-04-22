import type { FC, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import { Card, CardContent, ButtonBaseProps, CardActionArea } from '@mui/material';

import { useLongPress } from '@/hooks';

type ActionLinkProps = {
  type: 'link';
  to: string;
};

type ActionButtonProps = {
  type: 'button';
  onClick: ButtonBaseProps['onClick'];
  onLongPress?: () => void;
};

type ActionCommonProps = Partial<{
  start: React.ReactElement;
  end: React.ReactElement;
}>;

export const ActionItem: FC<Readonly<PropsWithChildren<ActionCommonProps & (ActionLinkProps | ActionButtonProps)>>> = ({
  children,
  start,
  end,
  ...props
}) => {
  const handleLongPress = useLongPress();

  return (
    <Card sx={{ mb: 2, borderRadius: 1.125 }}>
      <CardActionArea
        {...(props.type === 'link'
          ? { component: Link, to: props.to }
          : { onClick: props.onClick, ...(props.onLongPress ? { ...handleLongPress(props.onLongPress) } : null) })}
      >
        <CardContent
          sx={{
            alignItems: 'center',
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            p: '1.5rem 1.25rem',
          }}
        >
          {start}
          {children}
          {end}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
