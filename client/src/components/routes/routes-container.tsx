import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from 'src/config/routes';
import { NotificationsPage } from '../screens/notifications';
import { PullRequestsPage } from '../screens/pull-requests';

export const RoutesContainer = () => (
  <Switch>
    <Route path={Routes.Overview} component={() => <div>Git Board Overview</div>} />
    <Route path={Routes.Notifications} component={NotificationsPage} />
    <Route path={Routes.PullRequests} component={PullRequestsPage} />
    <Route path="/github/callback*" component={() => <div>callback...</div>} />
    <Redirect to="/overview" />
  </Switch>
);
