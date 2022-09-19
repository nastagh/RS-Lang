import React from 'react';
import '../../App.scss';
import { Grid, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import LoginForm from '../../components/LoginForm';
import { mainTheme } from '../../utils/theme';

export default function Login() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Box
        height="100%"
        display="flex"
        alignItems="center"
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          padding="2rem 20rem"
        >
          <Grid item xs={7}>
            <Box
              component="img"
              sx={{
                maxWidth: { xs: 550, md: 450 },
              }}
              src="/assets/images/LayingDoodle.png"
              alt="tet"
            />
            <Typography variant="h4">
              Изучать слова удобнее, если у вас есть профиль
              {/* Продолжай свое путешествие в мире английского языка вместе с нами! */}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <LoginForm />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>

  );
}
