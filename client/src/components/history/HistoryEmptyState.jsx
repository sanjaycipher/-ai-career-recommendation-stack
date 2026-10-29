import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import HistoryIcon from '@mui/icons-material/History';
import EmptyState from '../common/EmptyState.jsx';

/**
 * HistoryEmptyState — shown when the user has no past recommendations.
 */
const HistoryEmptyState = () => {
  const navigate = useNavigate();

  return (
    <EmptyState
      icon={HistoryIcon}
      title="No recommendations yet"
      description="Your past career matches will appear here."
      action={
        <Button
          variant="contained"
          onClick={() => navigate('/recommend')}
          sx={{ borderRadius: 2 }}
        >
          Start your first recommendation
        </Button>
      }
    />
  );
};

export default HistoryEmptyState;

