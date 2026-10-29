import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        background: 'linear-gradient(135deg, #6C63FF22, #F7F7FB)',
        px: 2,
        textAlign: 'center',
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: '6rem', md: '10rem' }, fontWeight: 800, color: 'primary.main', lineHeight: 1 }}
      >
        404
      </Typography>
      <Typography variant="h5" fontWeight={600}>
        Page not found
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: 360 }}>
        The page you're looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        size="large"
        startIcon={<HomeIcon />}
        onClick={() => navigate('/dashboard')}
        sx={{ mt: 1, borderRadius: 2, px: 4 }}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default NotFoundPage;

