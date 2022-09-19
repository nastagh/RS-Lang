import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import Layout from './components/Layout';
import HomePage from './pages/HomePage/HomePage';
import AudioCall from './pages/AudioCall/AudioCall';
import Sprint from './pages/Sprint/Sprint';
import StatisticPage from './pages/Statistic/StatisticPage';
import Error from './pages/Error';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import { AuthProvider } from './hooks/useAuth';
import BookPage from './pages/Book/BookPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Navigate to="/home" />} />
          <Route index path="home" element={<HomePage />} />
          <Route path="book" element={<BookPage />} />
          <Route path="audio-call" element={<AudioCall />} />
          <Route path="sprint" element={<Sprint />} />
          <Route path="statistic" element={<StatisticPage />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
export default App;
