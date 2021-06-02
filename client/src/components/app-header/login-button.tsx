import React from 'react';
import { Button, Avatar } from 'evergreen-ui';
import { useGitHubAuthContext } from '../auth-provider';

export const LoginButton: React.FC = () => {
  const { login, logout, user } = useGitHubAuthContext();

  if (user) {
    return (
      <div>
        <Button onClick={logout}>
          <span>Logout</span>
          <Avatar src={user.avatar_url} name={user.name} />
        </Button>
      </div>
    );
  }

  return <Button onClick={login}>Git Login</Button>;
};
