import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import MatchBadge from '../result/MatchBadge.jsx';
import { formatDate } from '../../utils/format.js';
import { expLabel } from '../../utils/experience.js';

/**
 * Derive tier from match percent — mirrors backend thresholds (65/45).
 */
const tierFromPercent = (p) => {
  const n = Number(p);
  if (n >= 65) return 'strong';
  if (n >= 45) return 'moderate';
  return 'explore';
};

/**
 * HistoryCard
 * Props: { item, onClick }
 */
const HistoryCard = ({ item, onClick }) => {
  const snap = item.input_snapshot ?? {};
  const tier = tierFromPercent(item.top_match_percent);

  return (
    <Paper
      variant="outlined"
      elevation={0}
      onClick={() => onClick?.(item.id)}
      sx={{
        p: 2.5,
        borderRadius: 3,
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        '&:hover': {
          borderColor: 'primary.main',
          boxShadow: 2,
        },
      }}
    >
      {/* Top row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
        {/* Left */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" fontWeight={700} noWrap>
            {item.top_career_title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDate(item.created_at)}
          </Typography>
        </Box>

        {/* Right */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
          <MatchBadge
            percent={item.top_match_percent}
            tier={tier}
            size={64}
          />
          <Typography variant="caption" color="text.secondary">
            top match
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      {/* Input summary chips */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
        <Chip
          size="small"
          variant="outlined"
          label={`${snap.skills?.length ?? 0} skill${(snap.skills?.length ?? 0) !== 1 ? 's' : ''}`}
        />
        <Chip
          size="small"
          variant="outlined"
          label={`${snap.interests?.length ?? 0} interest${(snap.interests?.length ?? 0) !== 1 ? 's' : ''}`}
        />
        <Chip
          size="small"
          variant="outlined"
          label={`${snap.subjects?.length ?? 0} subject${(snap.subjects?.length ?? 0) !== 1 ? 's' : ''}`}
        />
        <Chip
          size="small"
          variant="outlined"
          label={`Exp: ${expLabel(snap.experience)}`}
        />
      </Box>
    </Paper>
  );
};

export default HistoryCard;

