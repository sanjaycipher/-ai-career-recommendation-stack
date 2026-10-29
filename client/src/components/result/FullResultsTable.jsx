import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import TierChip from './TierChip.jsx';
import { TIER_COLORS } from '../../utils/careerColors.js';
import { formatPercent } from '../../utils/format.js';

/**
 * FullResultsTable
 * Props: { results }
 */
const FullResultsTable = ({ results = [] }) => {
  const sorted = [...results].sort((a, b) => a.rank - b.rank);

  return (
    <Paper variant="outlined" elevation={0} sx={{ borderRadius: 3 }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {['Rank', 'Career', 'Match', 'Tier', 'Core gaps'].map((col) => (
                <TableCell
                  key={col}
                  sx={{ fontWeight: 700, bgcolor: '#F7F7FB', fontSize: 13 }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sorted.map((row) => {
              const colors = TIER_COLORS[row.match_tier] ?? TIER_COLORS.explore;
              return (
                <TableRow
                  key={row.career_id ?? row.rank}
                  hover
                  sx={{ '&:last-child td': { border: 0 } }}
                >
                  <TableCell sx={{ color: 'text.secondary', width: 60 }}>
                    {row.rank}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>
                    {row.career_title}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, color: colors.main, width: 80 }}>
                    {formatPercent(row.match_percent)}
                  </TableCell>
                  <TableCell sx={{ width: 140 }}>
                    <TierChip tier={row.match_tier} size="small" />
                  </TableCell>
                  <TableCell sx={{ width: 100 }}>
                    {row.gap_summary?.core_gap_count > 0 ? (
                      <Typography variant="body2" color="warning.main" fontWeight={600}>
                        {row.gap_summary.core_gap_count}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="success.main">
                        —
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default FullResultsTable;

