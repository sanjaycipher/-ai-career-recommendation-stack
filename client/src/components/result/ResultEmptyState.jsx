import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import EmptyState from '../common/EmptyState.jsx';

/**
 * ResultEmptyState — shown when no recommendation data is available
 */
const ResultEmptyState = () => {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={InsightsOutlinedIcon}
      title="No recommendation yet"
      description="Answer a few questions to get ranked career matches."
      action={
        <Button
          variant="contained"
          onClick={() => navigate('/recommend')}
          sx={{ borderRadius: 2 }}
        >
          Start recommendation
        </Button>
      }
    />
  );
};

export default ResultEmptyState;

