import React from 'react';
import { Box, Typography } from '@mui/material';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';

const AppLogo = ({ sx, iconSize = 28 }) => {
  return (
    <Box display="flex" alignItems="center" gap={1} sx={sx}>
      <SchoolRoundedIcon sx={{ color: 'primary.main', fontSize: iconSize }} />
      <Typography variant="h6" fontWeight={700} sx={{ letterSpacing: '-0.5px' }}>
        CareerCompass
      </Typography>
    </Box>
  );
};

export default AppLogo;

