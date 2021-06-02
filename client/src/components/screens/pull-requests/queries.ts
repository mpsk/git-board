import { gql } from '@apollo/client';

export const GET_PULL_REQUESTS = gql`
  query GetPullRequests {
    search(query: "fork:false archived:false org:apptentive sort:updated-desc", type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          id
          name
          createdAt
          pushedAt
          updatedAt
          pullRequests(first: 10, orderBy: { field: UPDATED_AT, direction: DESC }) {
            nodes {
              url
              title
              state
              mergedAt
              createdAt
              author {
                login
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ORGS_PULL_REQUESTS = gql`
  query GetOrgsPullRequests {
    viewer {
      organizations(first: 10) {
        nodes {
          name
          repositories(first: 20, orderBy: { field: UPDATED_AT, direction: DESC }) {
            nodes {
              name
              url
              updatedAt
              pullRequests(first: 5, orderBy: { field: UPDATED_AT, direction: DESC }) {
                nodes {
                  url
                  title
                  updatedAt
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
