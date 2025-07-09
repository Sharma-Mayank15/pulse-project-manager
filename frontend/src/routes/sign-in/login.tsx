import React from 'react';
import { useEffect, useState } from 'react';
import { useLoginRequest } from '../../api/auth/auth-api';
import { TokenManager } from '../../utils/token-manager';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState<string>();

  const navigate = useNavigate();
  const { mutate, isSuccess, isError, error, data } = useLoginRequest();

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

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email && password) {
      await mutate({ email, password });
    } else {
      alert('Invalid email or password');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1>Login!</h1>
        <form onSubmit={handleLogin}>
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
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="shaped-blob"></div>

          {isError && errorText && (
            <label htmlFor="password">Error occured: {errorText}</label>
          )}

          <button type="submit" className="add-button">
            Login
          </button>

          <div className="form-group">
            <label>Do not have an account?</label>
            <button
              onClick={() => {
                navigate('/register');
              }}
              className="add-button"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
