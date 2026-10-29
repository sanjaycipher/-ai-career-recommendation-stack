import { createTheme } from '@mui/material/styles';

const baseTypography = {
  fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  h4: {
    fontWeight: 700,
  },
  h5: {
    fontWeight: 600,
  },
  h6: {
    fontWeight: 600,
  },
};

const baseComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 10,
        paddingTop: 10,
        paddingBottom: 10,
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      fullWidth: true,
      size: 'small',
    },
  },
};

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6C63FF',
    },
    secondary: {
      main: '#FF6584',
    },
    background: {
      default: '#F7F7FB',
      paper: '#FFFFFF',
    },
  },
  typography: baseTypography,
  shape: {
    borderRadius: 12,
  },
  components: baseComponents,
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6C63FF',
    },
    secondary: {
      main: '#FF6584',
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
  },
  typography: baseTypography,
  shape: {
    borderRadius: 12,
  },
  components: baseComponents,
});

export default theme;

