import React from 'react';
import { Route } from 'react-router-dom';
import { bemPrefix } from 'src/utils';
import { AppHeader } from '../app-header';
import { RoutesContainer } from '../routes';
import { Sidebar } from '../sidebar';

import './app.scss';

const bem = bemPrefix('app');

export const MainContent: React.FC = () => (
  <div className={bem()}>
    <AppHeader />
    <div className={bem('main')}>
      <Sidebar className={bem('sidebar')} />
      <div className={bem('content')}>
        <Route component={RoutesContainer} />
      </div>
    </div>
  </div>
);
