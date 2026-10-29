import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import SectionHeader from '../common/SectionHeader.jsx';
import MultiSelectField from './MultiSelectField.jsx';
import ExperienceSelector from './ExperienceSelector.jsx';

/**
 * RecommendFormCard
 * Props: { metaOptions, onSubmit, submitting, error }
 */
const RecommendFormCard = ({ metaOptions, onSubmit, submitting, error }) => {
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [experience, setExperience] = useState('any');

  const handleClear = () => {
    setSkills([]);
    setInterests([]);
    setSubjects([]);
    setExperience('any');
  };

  const handleSubmit = () => {
    onSubmit({ skills, interests, subjects, experience });
  };

  return (
    <Paper sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 3 }} variant="outlined" elevation={0}>
      <SectionHeader
        title="Tell us about you"
        subtitle="Pick what you know and where your interests lie. We'll find your best-fit careers."
      />

      <Stack spacing={3}>
        <MultiSelectField
          label="Skills you have"
          placeholder="Search skills…"
          options={metaOptions.skills ?? []}
          value={skills}
          onChange={setSkills}
          groupByCategory
          helperText="Choose at least 1 skill."
          max={50}
        />

        <MultiSelectField
          label="Interests"
          placeholder="Pick a few areas you enjoy"
          options={metaOptions.interests ?? []}
          value={interests}
          onChange={setInterests}
          helperText="Optional — helps refine results."
          max={20}
        />

        <MultiSelectField
          label="Academic subjects"
          placeholder="Subjects you've studied"
          options={metaOptions.subjects ?? []}
          value={subjects}
          onChange={setSubjects}
          groupByCategory
          helperText="Optional — improves accuracy."
          max={30}
        />

        <ExperienceSelector
          value={experience}
          onChange={setExperience}
          options={metaOptions.experience_options ?? []}
        />

        {error && (
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="text" onClick={handleClear} disabled={submitting}>
            Clear
          </Button>
          <Button
            variant="contained"
            size="large"
            disabled={skills.length === 0 || submitting}
            onClick={handleSubmit}
            sx={{ borderRadius: 2, px: 4, fontWeight: 600 }}
          >
            {submitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Get recommendations'
            )}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default RecommendFormCard;

