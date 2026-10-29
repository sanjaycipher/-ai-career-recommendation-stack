const DATE_FMT = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

export const formatDate = (iso) => {
  if (!iso) return '—';
  try {
    return DATE_FMT.format(new Date(iso));
  } catch {
    return '—';
  }
};

export const formatPercent = (n) => {
  if (n === null || n === undefined || isNaN(Number(n))) return '—';
  return `${Number(n).toFixed(1)}%`;
};

export const pluralize = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

