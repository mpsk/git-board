import React from 'react';
import { Alert } from 'evergreen-ui';
import { useGitHubAuthContext } from './github-auth-provider';

export const GitHubAuthValidator: React.FC<{}> = ({ children }) => {
  const { errorMsg } = useGitHubAuthContext();

  if (errorMsg) {
    return (
      <div>
        <Alert intent="danger" title={`Oops... ${errorMsg}`}></Alert>
        {children}
      </div>
    );
  }

  return <>{children}</>;
};
