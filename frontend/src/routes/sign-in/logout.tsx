import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogoutRequest } from '../../api/auth/auth-api';
import { queryClient } from '../../api/base-api';
import { TokenManager } from '../../utils/token-manager';

export const LogoutPage = () => {
  const navigate = useNavigate();
  const { mutate, isSuccess, isError, error, data } = useLogoutRequest();

  useEffect(() => {
    const refresh = TokenManager.getRefreshToken();
    if (refresh) {
      mutate({ refresh });
    }
    queryClient.invalidateQueries({ queryKey: ['/user'] });
    navigate('/');
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      navigate('/');
    }
    TokenManager.removeRefreshToken();
    TokenManager.removeAccessToken();
    TokenManager.removeUserToken();
  }, [isSuccess, isError, data, error]);

  return <></>;
};
