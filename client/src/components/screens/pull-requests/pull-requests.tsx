import React, { useMemo } from 'react';
import { chain } from 'lodash';
import { Spinner } from 'evergreen-ui';
import { PullRequestItem, PullRequestProps } from 'src/components/common';
import { useGetOrgsPullRequests, GetOrgsPullRequests } from './__generated__/get-orgs-pull-requests';

export const PullRequestsPage: React.FC = () => {
  const { data, loading } = useGetOrgsPullRequests();

  const pulls = useMemo(() => invokeLastPulls(data), [data]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <div>PullRequestsPage</div>
      <div>
        {pulls.map(item => (
          <PullRequestItem key={item.url} item={item} />
        ))}
      </div>
    </div>
  );
};

function invokeLastPulls(data?: GetOrgsPullRequests): PullRequestProps['item'][] {
  if (data) {
    return chain(data.viewer.organizations.nodes || [])
      .flatMap(item => (item ? item.repositories.nodes : []))
      .flatMap(item => (item ? item.pullRequests.nodes : []))
      .orderBy(item => (item ? new Date(item.updatedAt).valueOf() : 0), 'desc')
      .value() as any;
  }
  return [];
}
