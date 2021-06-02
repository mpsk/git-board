import * as Types from '../../../../__generated__/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {};
export type GetOrgsPullRequestsVariables = Types.Exact<{ [key: string]: never }>;

export type GetOrgsPullRequests = {
  __typename: 'Query';
  viewer: {
    __typename: 'User';
    organizations: {
      __typename: 'OrganizationConnection';
      nodes?: Types.Maybe<
        Array<
          Types.Maybe<{
            __typename: 'Organization';
            name?: Types.Maybe<string>;
            repositories: {
              __typename: 'RepositoryConnection';
              nodes?: Types.Maybe<
                Array<
                  Types.Maybe<{
                    __typename: 'Repository';
                    name: string;
                    pullRequests: {
                      __typename: 'PullRequestConnection';
                      nodes?: Types.Maybe<
                        Array<
                          Types.Maybe<{
                            __typename: 'PullRequest';
                            url: any;
                            title: string;
                            updatedAt: any;
                            repository: { __typename: 'Repository'; name: string; url: any };
                            author?: Types.Maybe<
                              | { __typename: 'Bot'; login: string; avatarUrl: any }
                              | { __typename: 'EnterpriseUserAccount'; login: string; avatarUrl: any }
                              | { __typename: 'Mannequin'; login: string; avatarUrl: any }
                              | { __typename: 'Organization'; login: string; avatarUrl: any }
                              | { __typename: 'User'; login: string; avatarUrl: any }
                            >;
                          }>
                        >
                      >;
                    };
                  }>
                >
              >;
            };
          }>
        >
      >;
    };
  };
};

export const GetOrgsPullRequestsDocument = gql`
  query GetOrgsPullRequests {
    viewer {
      organizations(first: 10) {
        nodes {
          name
          repositories(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }) {
            nodes {
              name
              pullRequests(first: 5, orderBy: { field: UPDATED_AT, direction: DESC }) {
                nodes {
                  url
                  title
                  updatedAt
                  repository {
                    name
                    url
                  }
                  author {
                    login
                    avatarUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetOrgsPullRequests__
 *
 * To run a query within a React component, call `useGetOrgsPullRequests` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgsPullRequests` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgsPullRequests({
 *   variables: {
 *   },
 * });
 */
export function useGetOrgsPullRequests(
  baseOptions?: Apollo.QueryHookOptions<GetOrgsPullRequests, GetOrgsPullRequestsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOrgsPullRequests, GetOrgsPullRequestsVariables>(GetOrgsPullRequestsDocument, options);
}
export function useGetOrgsPullRequestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOrgsPullRequests, GetOrgsPullRequestsVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetOrgsPullRequests, GetOrgsPullRequestsVariables>(GetOrgsPullRequestsDocument, options);
}
export type GetOrgsPullRequestsHookResult = ReturnType<typeof useGetOrgsPullRequests>;
export type GetOrgsPullRequestsLazyQueryHookResult = ReturnType<typeof useGetOrgsPullRequestsLazyQuery>;
export type GetOrgsPullRequestsQueryResult = Apollo.QueryResult<GetOrgsPullRequests, GetOrgsPullRequestsVariables>;
