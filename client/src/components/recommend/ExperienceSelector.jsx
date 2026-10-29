import React from 'react';
import Box from '@mui/material/Box';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';

/**
 * ExperienceSelector
 * Props: { value, onChange, options: [{value, label}] }
 */
const ExperienceSelector = ({ value, onChange, options = [] }) => {
  const handleChange = (_event, newValue) => {
    // Prevent deselection — always keep a value
    if (newValue !== null) onChange(newValue);
  };

  return (
    <Box>
      <Typography variant="body2" fontWeight={500} sx={{ mb: 1 }}>
        Preferred work experience
      </Typography>
      <ToggleButtonGroup
        exclusive
        value={value}
        onChange={handleChange}
        size="small"
        sx={{ flexWrap: 'wrap', gap: 0.5 }}
      >
        {options.map((opt) => (
          <ToggleButton
            key={opt.value}
            value={opt.value}
            sx={{
              borderRadius: '8px !important',
              textTransform: 'none',
              fontSize: 13,
              px: 2,
              '&.Mui-selected': {
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
              },
            }}
          >
            {opt.label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.75, display: 'block' }}>
        Optional — leave as 'Any' if unsure
      </Typography>
    </Box>
  );
};

export default ExperienceSelector;

