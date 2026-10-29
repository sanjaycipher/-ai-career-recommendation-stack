import React, { useMemo } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const filter = createFilterOptions({
  ignoreAccents: true,
  ignoreCase: true,
  trim: true,
});

/**
 * MultiSelectField
 * Props: {
 *   label, placeholder, options, value (string[]), onChange,
 *   groupByCategory?, helperText?, max?
 * }
 */
const MultiSelectField = ({
  label,
  placeholder,
  options = [],
  value = [],
  onChange,
  groupByCategory = false,
  helperText,
  max,
}) => {
  // Resolve string values back to option objects
  const selectedObjects = useMemo(() => {
    return value.map((name) => {
      const found = options.find((o) => o.name === name);
      return found ?? { name };
    });
  }, [value, options]);

  const handleChange = (_event, newValues) => {
    const names = newValues.map((o) => (typeof o === 'string' ? o : o.name));
    const limited = max ? names.slice(0, max) : names;
    onChange(limited);
  };

  const groupByProps = groupByCategory
    ? { groupBy: (opt) => opt.category || 'Other' }
    : {};

  const caption =
    max != null
      ? `${value.length} / ${options.length} selected`
      : value.length > 0
      ? `${value.length} selected`
      : null;

  return (
    <Box>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.name)}
        isOptionEqualToValue={(opt, val) => opt.name === (typeof val === 'string' ? val : val.name)}
        value={selectedObjects}
        onChange={handleChange}
        filterOptions={(opts, state) => {
          const filtered = filter(opts, state);
          return max && value.length >= max ? [] : filtered;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={selectedObjects.length === 0 ? placeholder : undefined}
            helperText={helperText}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={key}
                label={typeof option === 'string' ? option : option.name}
                size="small"
                color="primary"
                {...tagProps}
              />
            );
          })
        }
        {...groupByProps}
        ChipProps={{ size: 'small', color: 'primary' }}
        limitTags={6}
        getLimitTagsText={(more) => `+${more} more`}
        disableCloseOnSelect
      />
      {caption && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', pl: 0.5 }}>
          {caption}
        </Typography>
      )}
    </Box>
  );
};

export default MultiSelectField;

