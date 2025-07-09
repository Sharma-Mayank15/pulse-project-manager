import { TokenManager } from '../../utils/token-manager';
import { refreshTokenRequest } from '../auth/auth-api';

export const handleRefreshToken = async () => {
  const refreshToken = TokenManager.getRefreshToken();
  if (refreshToken) {
    const newAccessToken = await refreshTokenRequest({ refresh: refreshToken });
    TokenManager.removeAccessToken();
    TokenManager.saveAccessToken(newAccessToken.data.access);
  }
};
