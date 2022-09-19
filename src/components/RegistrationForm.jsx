import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../services/UserService';
import errorMessages from '../constants/errorMessages';
import { isValidEmail, isValidName, isValidPassword } from '../utils/validator';

export default function RegistrationForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!isValidName(data.get('username'))) {
      return setErrorMessage(errorMessages.INCORRECT_NAME);
    }

    if (!isValidEmail(data.get('email'))) {
      return setErrorMessage(errorMessages.INVALID_EMAIL);
    }

    if (!isValidPassword(data.get('password'))) {
      return setErrorMessage(errorMessages.INCORRECT_PASSWORD);
    }

    const result = await UserService.registration(data.get('username'), data.get('email'), data.get('password'));
    if (result.successful) {
      navigate('/login');
    } else {
      switch (result.code) {
        case 422:
          setErrorMessage(errorMessages.INCORRECT_CREDENTIALS);
          break;
        default:
          setErrorMessage(errorMessages.SERVER_ERROR);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" color="primary">
          Регистрация
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="Имя пользователя"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Typography variant="error">
            {errorMessage}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
          >
            Зарегистрироваться
          </Button>
          <Link to="/login" className="link">
            Есть аккаунт? Войти
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
