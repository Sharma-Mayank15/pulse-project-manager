import React, { useEffect, useState } from 'react';
import { useEditUserDetailsRequest } from '../../api/auth/auth-api';
import { AxiosError } from 'axios';

export const ProfileDetails = ({ userDetails }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState<string>();

  const { mutate, isSuccess, isError, error, data } = useEditUserDetailsRequest(
    userDetails.id,
  );

  const handleEdit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email && username && password) {
      await mutate({ email, password, username });
    } else {
      setErrorText('Enter ALL the fields!');
    }
  };

  useEffect(() => {
    if (isSuccess && data) {
      setErrorText('');
    }

    if (isError) {
      if (error instanceof AxiosError && error?.response) {
        setErrorText('Please enter different email');
      } else {
        setErrorText('Something went wrong');
      }
    }
  }, [isSuccess, isError, data, error]);

  return (
    <>
      <div className="projects-header">
        <h1>Profile Details</h1>
      </div>
      <p>Username: {userDetails.username}</p>
      <p>Email: {userDetails.email}</p>
      <div className="projects-section">
        <h4>Anything you want to change? (Ensure to fill ALL the fields!)</h4>
        <form onSubmit={handleEdit}>
          <div className="form-group">
            <label htmlFor="username">Change Email:</label>
            <input
              id="username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Change Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Change Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorText && (
            <label htmlFor="password">Error occured: {errorText}</label>
          )}

          <button type="submit" className="add-button">
            Update Details
          </button>
        </form>
      </div>
    </>
  );
};
