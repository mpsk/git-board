/* eslint-disable */
import React from 'react';
import { Pane, Menu, Heading, SideSheet } from 'evergreen-ui';

import { bemPrefix } from 'src/utils';
import { LoginButton } from './login-button';

import './app-header.scss';

interface AppHeaderProps {}

const bem = bemPrefix('app-header');

export const AppHeader: React.FC<AppHeaderProps> = () => {
  return (
    <header className={bem()}>
      <Pane display="flex" className={bem('pane')}>
        <Pane className={bem('logo')}>
          <Heading size={400}>Git Hub Info</Heading>
        </Pane>
        <Pane className={bem('menu-items')}>
          <Menu.Item>Dashboard</Menu.Item>
        </Pane>
        <Pane className={bem('profile')}>
          <LoginButton />
        </Pane>
      </Pane>
    </header>
  );
};
