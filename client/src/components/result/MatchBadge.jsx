import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TIER_COLORS } from '../../utils/careerColors.js';
import { formatPercent } from '../../utils/format.js';

/**
 * MatchBadge
 * Props: { percent, size?: number, tier }
 */
const MatchBadge = ({ percent, size = 88, tier }) => {
  const colors = TIER_COLORS[tier] ?? TIER_COLORS.explore;

  return (
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `4px solid ${colors.main}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.main,
        fontWeight: 700,
        fontSize: size >= 80 ? 22 : 18,
        flexShrink: 0,
        bgcolor: colors.soft,
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: size >= 80 ? 20 : 16,
          lineHeight: 1,
          color: colors.main,
        }}
      >
        {formatPercent(percent)}
      </Typography>
    </Box>
  );
};

export default MatchBadge;

