import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ReplayIcon from '@mui/icons-material/Replay';
import { getRecommendation } from '../api/recommend.js';
import SectionHeader from '../components/common/SectionHeader.jsx';
import CareerHeroCard from '../components/result/CareerHeroCard.jsx';
import FullResultsTable from '../components/result/FullResultsTable.jsx';
import ResultEmptyState from '../components/result/ResultEmptyState.jsx';

const ResultPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const result = await getRecommendation(id);
      setData(result);
    } catch (err) {
      if (err?.response?.status === 404) {
        setNotFound(true);
      } else {
        setError(err?.response?.data?.error ?? err.message ?? 'Failed to load recommendation.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 12 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (notFound) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <ResultEmptyState />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Alert
          severity="error"
          sx={{ borderRadius: 2 }}
          action={
            <Button size="small" color="inherit" startIcon={<ReplayIcon />} onClick={fetchData}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="md" sx={{ py: 3 }}>
        <ResultEmptyState />
      </Container>
    );
  }

  const results = data.results ?? [];
  const snap = data.input_snapshot ?? {};

  const [rank1, rank2, rank3, ...rest] = results;

  const subtitle = [
    snap.skills?.length ? `${snap.skills.length} skill${snap.skills.length !== 1 ? 's' : ''}` : null,
    snap.interests?.length ? `${snap.interests.length} interest${snap.interests.length !== 1 ? 's' : ''}` : null,
    snap.subjects?.length ? `${snap.subjects.length} subject${snap.subjects.length !== 1 ? 's' : ''}` : null,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <SectionHeader
        title="Your career matches"
        subtitle={subtitle ? `Based on ${subtitle}` : undefined}
        action={
          <Button
            variant="outlined"
            size="small"
            startIcon={<ReplayIcon />}
            onClick={() => navigate('/recommend')}
            sx={{ borderRadius: 2, whiteSpace: 'nowrap' }}
          >
            New recommendation
          </Button>
        }
      />

      {/* Top 3 hero cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Rank 1 — full width hero */}
        {rank1 && (
          <Grid item xs={12}>
            <CareerHeroCard career={rank1} highlighted />
          </Grid>
        )}

        {/* Rank 2 & 3 — side by side on md+ */}
        {rank2 && (
          <Grid item xs={12} md={6}>
            <CareerHeroCard career={rank2} />
          </Grid>
        )}
        {rank3 && (
          <Grid item xs={12} md={6}>
            <CareerHeroCard career={rank3} />
          </Grid>
        )}
      </Grid>

      {/* All 28 results table */}
      <Divider sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
          All {results.length} matches
        </Typography>
      </Divider>

      <FullResultsTable results={results} />

      <Typography
        variant="caption"
        color="text.disabled"
        sx={{ display: 'block', mt: 2, textAlign: 'center' }}
      >
        Rankings use rule-based scoring. Missing skill suggestions are prioritized by importance for
        that career.
      </Typography>
    </Container>
  );
};

export default ResultPage;

