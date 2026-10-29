import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TierChip from './TierChip.jsx';
import MatchBadge from './MatchBadge.jsx';
import RadarPanel from './RadarPanel.jsx';
import GapSummaryPanel from './GapSummaryPanel.jsx';

/**
 * CareerHeroCard
 * Props: { career, highlighted? }
 */
const CareerHeroCard = ({ career, highlighted = false }) => (
  <Paper
    variant="outlined"
    elevation={0}
    sx={{
      p: { xs: 2, sm: 3 },
      borderRadius: 3,
      border: highlighted ? '2px solid #6C63FF44' : '1px solid #EEF0F4',
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
    }}
  >
    {/* Top row */}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Chip
          label={`Rank #${career.rank}`}
          size="small"
          sx={{
            bgcolor: '#6C63FF',
            color: 'white',
            fontWeight: 700,
            height: 22,
            fontSize: 12,
            mb: 1,
          }}
        />
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ lineHeight: 1.2, mb: 1, wordBreak: 'break-word' }}
        >
          {career.career_title}
        </Typography>
        <TierChip tier={career.match_tier} size="small" />
      </Box>

      <MatchBadge
        percent={career.match_percent}
        tier={career.match_tier}
        size={96}
      />
    </Box>

    <Divider sx={{ my: 2 }} />

    {/* Body */}
    <Grid container spacing={2}>
      <Grid item xs={12} md={5}>
        <RadarPanel career={career} size={220} />
      </Grid>
      <Grid item xs={12} md={7}>
        <GapSummaryPanel career={career} />
      </Grid>
    </Grid>
  </Paper>
);

export default CareerHeroCard;

