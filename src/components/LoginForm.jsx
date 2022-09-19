import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
// import UserService from '../services/UserService';
import { isValidEmail, isValidPassword } from '../utils/validator';
import errorMessages from '../constants/errorMessages';
import useAuth from '../hooks/useAuth';

export default function LoginForm() {
  const [validationError, setValidationError] = useState('');
  // const navigate = useNavigate();
  const { login, error } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    if (!isValidEmail(data.get('email'))) {
      return setValidationError(errorMessages.INVALID_EMAIL);
    }

    if (!isValidPassword(data.get('password'))) {
      return setValidationError(errorMessages.EMPTY_PASSWORD);
    }

    login({ email, password });
  };
  let loginError = '';
  if (error) {
    switch (error.code) {
      case 403:
        loginError = errorMessages.INCORRECT_CREDENTIALS;
        break;
      case 404:
        loginError = errorMessages.USER_NOT_FOUND;
        break;
      default:
        loginError = errorMessages.SERVER_ERROR;
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 5,
          padding: 2,
          borderRadius: 3,
        }}
      >
        <Typography component="h1" variant="h5" color="primary">
          Вход в аккаунт
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Typography variant="error">
            {validationError || loginError}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            color="secondary"
          >
            Войти
          </Button>

          <Link to="/registration" className="link">
            Нет аккаунта? Регистрация
          </Link>

        </Box>
      </Box>
    </Container>
  );
}
