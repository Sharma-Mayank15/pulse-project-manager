import React from 'react';
import { useUserRequest } from '../../api/user/user-api';
import { ProfileDetails } from '../../components/profile-details/profile-details';
import { TokenManager } from '../../utils/token-manager';

export const Profile = () => {
  const userId = TokenManager.getUserToken();

  const { data, isSuccess, isError, error } = useUserRequest({
    id: userId ?? '',
  });

  if (isError) {
    console.error(error);
  }

  const userDetails = data?.data;

  return (
    <div className="projects-section">
      {isSuccess && userDetails && <ProfileDetails userDetails={userDetails} />}
    </div>
  );
};
