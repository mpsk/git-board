import React from 'react';
import { Avatar, GitPullIcon, Text, Link } from 'evergreen-ui';
import { PullRequest, Repository, User } from 'src/__generated__/graphql';
import { bemPrefix } from 'src/utils';

import './pull-request.scss';

const bem = bemPrefix('pull-request-item');

export interface PullRequestProps {
  item: Pick<PullRequest, 'url' | 'title' | 'updatedAt'> & {
    repository: Pick<Repository, 'name' | 'url'>;
    author: Pick<User, 'login' | 'avatarUrl'>;
  };
}

export const PullRequestItem: React.FC<PullRequestProps> = ({ item }) => {
  return (
    <div className={bem()}>
      <GitPullIcon />
      <Text>{item.title}</Text>
      <Link href={item.url} target="_blank">
        {item.title}
      </Link>
      <Text>({item.repository.name})</Text>
      <div>
        <Avatar src={item.author.avatarUrl} />
        <Text>Author: {item.author.login}</Text>
      </div>
      <Text>Date: {item.updatedAt}</Text>
    </div>
  );
};
