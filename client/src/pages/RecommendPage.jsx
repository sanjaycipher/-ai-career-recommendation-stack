import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getMetaOptions } from '../api/meta.js';
import { createRecommendation } from '../api/recommend.js';
import SectionHeader from '../components/common/SectionHeader.jsx';
import RecommendFormCard from '../components/recommend/RecommendFormCard.jsx';

const RecommendPage = () => {
  const navigate = useNavigate();
  const [metaOptions, setMetaOptions] = useState(null);
  const [loadingMeta, setLoadingMeta] = useState(true);
  const [metaError, setMetaError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const fetchMeta = async () => {
    setLoadingMeta(true);
    setMetaError(null);
    try {
      const data = await getMetaOptions();
      setMetaOptions(data);
    } catch (err) {
      setMetaError(err?.response?.data?.error ?? err.message ?? 'Could not load form options.');
    } finally {
      setLoadingMeta(false);
    }
  };

  useEffect(() => {
    fetchMeta();
  }, []);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const data = await createRecommendation(payload);
      navigate(`/recommendations/${data.recommendation_id}`, {
        state: { justCreated: true },
      });
    } catch (err) {
      const msg =
        err?.response?.status === 503
          ? 'ML service is currently unavailable. Please try again in a moment.'
          : err?.response?.data?.error ?? err.message ?? 'Something went wrong. Please try again.';
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingMeta) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <SectionHeader
        title="New recommendation"
        subtitle="Answer a few questions and we'll rank 28 careers."
      />

      {metaError && (
        <Alert
          severity="error"
          sx={{ mb: 3, borderRadius: 2 }}
          action={
            <Button size="small" color="inherit" startIcon={<RefreshIcon />} onClick={fetchMeta}>
              Retry
            </Button>
          }
        >
          {metaError}
        </Alert>
      )}

      <RecommendFormCard
        metaOptions={metaOptions ?? {}}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={submitError}
      />
    </Container>
  );
};

export default RecommendPage;

