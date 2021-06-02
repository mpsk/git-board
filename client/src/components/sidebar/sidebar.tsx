import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Tablist, NotificationsIcon, GitPullIcon, GridViewIcon, SidebarTab, Text, Icon } from 'evergreen-ui';

import { bemPrefix } from 'src/utils';
import './sidebar.scss';
import { Routes } from 'src/config/routes';

const bem = bemPrefix('sidebar');

const TABS = [
  {
    label: 'Overview',
    href: Routes.Overview,
    icon: GridViewIcon,
  },
  {
    label: 'Notifications',
    href: Routes.Notifications,
    icon: NotificationsIcon,
  },
  {
    label: 'Pull Requests',
    href: Routes.PullRequests,
    icon: GitPullIcon,
  },
];

export const Sidebar: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`${className} ${bem()}`}>
      <Menu.Group>
        <Tablist>
          {TABS.map(tab => (
            <NavLink className={bem('link-tab')} key={tab.label} to={tab.href}>
              <SidebarTab className={bem('tab')}>
                <Icon icon={tab.icon}></Icon>
                <Text paddingLeft={8}>{tab.label}</Text>
              </SidebarTab>
            </NavLink>
          ))}
        </Tablist>
      </Menu.Group>
      <Menu.Divider />
    </div>
  );
};
