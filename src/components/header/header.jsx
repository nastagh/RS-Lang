import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './header.scss';
import SwitchTheme from './SwitchTheme';

export default function Header() {
  const { user, logout } = useAuth();
  return (
    <header className="header">
      <Link to="/home">
        <span className="logo">
          <span className="logo-blue">l</span>
          earn
          <span className="logo-blue">e</span>
          nglish
        </span>
      </Link>
      <nav>
        <Link to="/home">Главная</Link>
        <Link to="/book">Учебник</Link>
        <Link to="/audio-call">Аудиовызов</Link>
        <Link to="/sprint">Спринт</Link>
        {user && <Link to="/statistic">Статистика</Link>}

      </nav>
      <SwitchTheme />
      {user
        ? (
          <Button
            onClick={logout}
            startIcon={<img className="login-icon" src="assets/images/logout-img.png" alt="Logo" />}
          />
        )
        : (
          <Link to="/login">
            <img className="login-icon" src="assets/images/login-64.png" alt="Logo" />
          </Link>
        )}
    </header>
  );
}
