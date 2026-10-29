import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

/**
 * GapSummaryPanel
 * Props: { career }
 */
const GapSummaryPanel = ({ career }) => {
  const { gap_summary = {}, matched_skills = [] } = career;
  const {
    core_gaps = [],
    secondary_gaps = [],
    core_gap_count = 0,
    secondary_gap_count = 0,
  } = gap_summary;

  return (
    <Stack spacing={2}>
      {/* Core gaps */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          Core gaps ({core_gap_count})
        </Typography>
        {core_gaps.length === 0 ? (
          <Typography variant="body2" color="success.main">
            ✅ No core gaps — you have the essentials.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {core_gaps.map((g) => (
              <Chip
                key={g}
                label={g}
                size="small"
                sx={{ bgcolor: '#FFF4E5', color: '#ED6C02', fontWeight: 600 }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Secondary gaps */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          Nice-to-have ({secondary_gap_count})
        </Typography>
        {secondary_gaps.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Nothing else to add.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {secondary_gaps.map((g) => (
              <Chip
                key={g}
                label={g}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            ))}
          </Box>
        )}
      </Box>

      {/* Matched skills */}
      <Box>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>
          You already have ({matched_skills.length})
        </Typography>
        {matched_skills.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No matching skills yet.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {matched_skills.map((s) => (
              <Chip
                key={s}
                label={s}
                size="small"
                sx={{ bgcolor: '#E8F5E9', color: '#2E7D32' }}
              />
            ))}
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default GapSummaryPanel;

