import { createTheme } from '@mui/material/styles';
import App from '../App.scss';

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: App.primary,
    },
    secondary: {
      main: App.secondary,
    },
    third: {
      main: App.grey,
    },
  },
  typography: {
    error: {
      color: '#d90429',
    },
    fontFamily: [
      'Gilroy',
    ].join(','),
    h4: {
      fontSize: '2rem',
      color: App.secondary,
    },
    h3: {
      color: App.secondary,
    },
    subtitle1: {
      fontFamily: 'Gilroy Regular',
      fontSize: '1.5rem',
    },
    textError: {
      fontSize: '1.5rem',
      color: App.primary,
    },

  },
});
