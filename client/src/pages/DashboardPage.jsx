import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAuth } from '../contexts/AuthContext.jsx';
import { listRecommendations } from '../api/recommend.js';
import { formatPercent, formatDate } from '../utils/format.js';

const StatCard = ({ icon, label, value, loading }) => (
  <Paper
    sx={{
      p: 3,
      borderRadius: 3,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      height: '100%',
    }}
    elevation={0}
    variant="outlined"
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        bgcolor: 'primary.50',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'primary.main',
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {label}
      </Typography>
      {loading ? (
        <Skeleton variant="text" width={80} height={32} />
      ) : (
        <Typography variant="h6" fontWeight={700} noWrap>
          {value}
        </Typography>
      )}
    </Box>
  </Paper>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: null, bestMatch: null, lastAt: null });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const fetchStats = async () => {
      try {
        const data = await listRecommendations({ page: 1, limit: 1 });
        if (cancelled) return;
        const items = data.items ?? data.recommendations ?? [];
        const total = data.total ?? data.pagination?.total ?? items.length;
        setStats({
          total,
          bestMatch: items[0]?.top_match_percent ?? null,
          lastAt: items[0]?.created_at ?? null,
        });
      } catch {
        // silent — stats are non-critical
      } finally {
        if (!cancelled) setLoadingStats(false);
      }
    };
    fetchStats();
    return () => { cancelled = true; };
  }, []);

  const total = stats.total;
  const hasHistory = total !== null && total > 0;

  return (
    <Box>
      {/* Hero welcome card */}
      <Paper
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 3,
          mb: 3,
          background: 'linear-gradient(135deg, #6C63FF18, #ffffff)',
        }}
        elevation={0}
        variant="outlined"
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Welcome, {user?.name}! 👋
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Discover careers that match your skills, interests, and academic background.
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<AutoAwesomeIcon />}
          onClick={() => navigate('/recommend')}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          Start a new recommendation →
        </Button>

        {/* "View history" link — only when user has prior recommendations */}
        {!loadingStats && hasHistory && (
          <Box sx={{ mt: 2 }}>
            <Button
              variant="text"
              size="small"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate('/history')}
            >
              View your history ({total})
            </Button>
          </Box>
        )}
      </Paper>

      {/* Stat Cards */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<AssessmentIcon />}
            label="Recommendations made"
            loading={loadingStats}
            value={hasHistory ? total : '—'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<EmojiEventsIcon />}
            label="Best match"
            loading={loadingStats}
            value={stats.bestMatch !== null ? formatPercent(stats.bestMatch) : '—'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard
            icon={<AccessTimeIcon />}
            label="Last activity"
            loading={loadingStats}
            value={stats.lastAt ? formatDate(stats.lastAt) : '—'}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
