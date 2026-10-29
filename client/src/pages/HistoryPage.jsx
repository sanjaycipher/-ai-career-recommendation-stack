import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Pagination from '@mui/material/Pagination';
import AddIcon from '@mui/icons-material/Add';
import { listRecommendations } from '../api/recommend.js';
import SectionHeader from '../components/common/SectionHeader.jsx';
import HistoryCard from '../components/history/HistoryCard.jsx';
import HistoryEmptyState from '../components/history/HistoryEmptyState.jsx';

const SkeletonCard = () => (
  <Skeleton variant="rounded" height={140} sx={{ borderRadius: 3 }} />
);

const HistoryPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = () => setReloadKey((k) => k + 1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    listRecommendations({ page, limit: 10 })
      .then((res) => {
        if (cancelled) return;
        const fetchedItems = res.items ?? res.recommendations ?? [];
        setItems(fetchedItems);
        // Handle both flat (total at root) and nested (pagination.total) shapes
        const pag = res.pagination ?? {};
        setPagination({
          page: pag.page ?? page,
          limit: pag.limit ?? 10,
          total: res.total ?? pag.total ?? fetchedItems.length,
          totalPages: pag.totalPages ?? pag.pages ?? Math.ceil((res.total ?? pag.total ?? fetchedItems.length) / 10) || 1,
        });
      })
      .catch((e) => {
        if (!cancelled) setError(e?.response?.data?.error ?? e.message ?? 'Failed to load history.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [page, reloadKey]);

  const subtitle =
    pagination.total > 0
      ? `${pagination.total} saved recommendation${pagination.total === 1 ? '' : 's'}`
      : 'Past recommendations will appear here.';

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <SectionHeader
        title="Your history"
        subtitle={subtitle}
        action={
          <Button
            variant="outlined"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => navigate('/recommend')}
            sx={{ borderRadius: 2, whiteSpace: 'nowrap' }}
          >
            New recommendation
          </Button>
        }
      />

      {/* Loading state — skeleton cards */}
      {loading && (
        <Stack spacing={2}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </Stack>
      )}

      {/* Error state */}
      {!loading && error && (
        <Box>
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
          <Button variant="outlined" onClick={reload} sx={{ borderRadius: 2 }}>
            Try again
          </Button>
        </Box>
      )}

      {/* Empty state */}
      {!loading && !error && items.length === 0 && <HistoryEmptyState />}

      {/* Success state */}
      {!loading && !error && items.length > 0 && (
        <>
          <Stack spacing={2}>
            {items.map((it) => (
              <HistoryCard
                key={it.id}
                item={it}
                onClick={(id) => navigate(`/recommendations/${id}`)}
              />
            ))}
          </Stack>

          {pagination.totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={pagination.totalPages}
                page={page}
                onChange={(_, v) => {
                  setPage(v);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                color="primary"
                shape="rounded"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default HistoryPage;

