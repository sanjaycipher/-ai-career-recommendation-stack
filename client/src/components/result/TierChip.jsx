import React from 'react';
import Chip from '@mui/material/Chip';
import { TIER_COLORS } from '../../utils/careerColors.js';

/**
 * TierChip
 * Props: { tier: 'strong'|'moderate'|'explore', size?: 'small'|'medium' }
 */
const TierChip = ({ tier, size = 'small' }) => {
  const colors = TIER_COLORS[tier] ?? TIER_COLORS.explore;

  return (
    <Chip
      label={colors.label}
      size={size}
      sx={{
        backgroundColor: colors.soft,
        color: colors.main,
        fontWeight: 600,
        borderRadius: '8px',
        textTransform: 'none',
      }}
    />
  );
};

export default TierChip;

