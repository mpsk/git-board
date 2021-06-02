import React, { useEffect } from 'react';
import { EventsApi } from 'src/api/events';
import { Rest } from 'src/api/rest';
import { UserApi } from 'src/api/user';
import { useGitHubAuthContext } from 'src/components/auth-provider';

export const NotificationsPage: React.FC<{}> = () => {
  const { user } = useGitHubAuthContext();

  // README: Just check info
  useEffect(() => {
    if (!user) {
      return;
    }
    EventsApi.get();

    UserApi.getEvents(user.login);
    // Rest.httpGet('/api/events');

    Rest.httpGet('/api/user/memberships/orgs');
    Rest.httpGet(`/api/users/${user.login}`);
    Rest.httpGet(`/api/users/${user.login}/repos`);
    Rest.httpGet(`/api/users/${user.login}/subscriptions`);
    Rest.httpGet(`/api/users/${user.login}/received_events`);
  }, [user]);

  return <div>Notifications</div>;
};
