import React, {
  createContext, useMemo, useContext, useState, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);

  const navigate = useNavigate();

  const cleanUserData = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('user-data');
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user-data'));
    if (userData && !user) {
      UserService.getUser(userData.id)
        .then((result) => {
          if (result.successful) {
            setUser(result.data);
          } else {
            cleanUserData();
          }
          setLoadingInitial(false);
        });
    } else {
      setLoadingInitial(false);
    }
  });

  const login = async ({ email, password }) => {
    const result = await UserService.login(email, password);
    if (result.successful) {
      localStorage.setItem('auth-token', result.data.token);
      localStorage.setItem('refresh-token', result.data.refreshToken);
      const userData = { id: result.data.userId, name: result.data.name };
      localStorage.setItem('user-data', JSON.stringify(userData));
      setUser(userData);
      navigate('/home');
    } else {
      setError(result);
    }
  };

  const logout = () => {
    cleanUserData();
    setUser(null);
    navigate('/home');
  };

  const memoedValue = useMemo(
    () => ({
      user,
      error,
      login,
      logout,
    }),
    [user, error],
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children }
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
