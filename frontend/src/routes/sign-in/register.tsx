import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterRequest } from '../../api/auth/auth-api';
import { TokenManager } from '../../utils/token-manager';

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordDupe, setPasswordDupe] = useState('');
  const [errorText, setErrorText] = useState<string>();

  const navigate = useNavigate();
  const { mutate, isSuccess, isError, error, data } = useRegisterRequest();

  useEffect(() => {
    if (isSuccess && data) {
      setErrorText('');
      const { access, refresh, id } = data.data;
      TokenManager.saveAccessToken(access);
      TokenManager.saveRefreshToken(refresh);
      TokenManager.saveUserToken(id);
      navigate('/');
    }

    if (isError) {
      console.log('error');

      if (
        error instanceof AxiosError &&
        error?.response &&
        error.response.status === 401
      ) {
        setErrorText('Invalid email or password');
      } else {
        setErrorText('Something went wrong, please try again later');
      }
    }
  }, [isSuccess, isError, data, error]);

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== passwordDupe) {
      setErrorText('Passwords do not match');
      return;
    }
    if (email && password && username) {
      await mutate({ email, password, username });
    } else {
      alert('Invalid email, username or password');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Register!</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password:</label>
            <input
              id="password"
              type="password"
              value={passwordDupe}
              onChange={(e) => setPasswordDupe(e.target.value)}
            />
          </div>
          {errorText && (
            <label htmlFor="password">Error occured: {errorText}</label>
          )}

          <button type="submit" className="add-button">
            Register!
          </button>
        </form>
      </div>
    </div>
  );
};
