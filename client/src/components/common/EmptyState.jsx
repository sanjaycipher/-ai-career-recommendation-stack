import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

/**
 * EmptyState
 * Props: { icon: MUI SvgIcon component, title, description, action? }
 */
const EmptyState = ({ icon: Icon, title, description, action }) => (
  <Paper
    variant="outlined"
    elevation={0}
    sx={{
      p: 6,
      textAlign: 'center',
      borderRadius: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1.5,
    }}
  >
    {Icon && <Icon sx={{ fontSize: 56, color: 'text.disabled' }} />}
    <Typography variant="h6" fontWeight={600}>
      {title}
    </Typography>
    {description && (
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 380 }}>
        {description}
      </Typography>
    )}
    {action && <Box sx={{ mt: 1 }}>{action}</Box>}
  </Paper>
);

export default EmptyState;

