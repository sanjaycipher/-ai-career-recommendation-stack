import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TIER_COLORS } from '../../utils/careerColors.js';

/**
 * RadarPanel
 * Props: { career, size?: number }
 */
const RadarPanel = ({ career, size = 240 }) => {
  const colors = TIER_COLORS[career.match_tier] ?? TIER_COLORS.explore;

  const data = [
    { axis: 'Skills',     value: Number((career.sub_scores?.skills     ?? 0).toFixed(1)) },
    { axis: 'Interests',  value: Number((career.sub_scores?.interests  ?? 0).toFixed(1)) },
    { axis: 'Subjects',   value: Number((career.sub_scores?.subjects   ?? 0).toFixed(1)) },
    { axis: 'Experience', value: Number((career.sub_scores?.experience ?? 0).toFixed(1)) },
  ];

  return (
    <Paper
      variant="outlined"
      elevation={0}
      sx={{ p: 2, borderRadius: 2, border: '1px solid #EEF0F4' }}
    >
      <Typography
        variant="subtitle2"
        fontWeight={600}
        noWrap
        sx={{ mb: 0.5 }}
      >
        {career.career_title}
      </Typography>

      <Chip
        label={`Rank #${career.rank}`}
        size="small"
        sx={{
          bgcolor: '#6C63FF',
          color: 'white',
          fontWeight: 700,
          height: 20,
          fontSize: 11,
          mb: 1,
        }}
      />

      <ResponsiveContainer width="100%" height={size}>
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fontSize: 11, fill: '#6B7280' }}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name={career.career_title}
            dataKey="value"
            stroke={colors.main}
            fill={colors.main}
            fillOpacity={0.35}
            strokeWidth={2}
          />
          <Tooltip formatter={(v) => `${Number(v).toFixed(1)}%`} />
        </RadarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default RadarPanel;

