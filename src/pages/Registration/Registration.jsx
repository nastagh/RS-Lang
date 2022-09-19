import React from 'react';
import '../../App.scss';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
// import { Link } from 'react-router-dom';
import { mainTheme } from '../../utils/theme';
import RegistrationForm from '../../components/RegistrationForm';

export default function Registration() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Grid
        container
        height="100%"
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item>
            <Typography variant="h4">
              Зарегистрируйся и изучай английский вместе с нами
            </Typography>
          </Grid>

          <Grid item>
            <RegistrationForm />
          </Grid>
        </Grid>

      </Grid>

    </ThemeProvider>
  );
}
