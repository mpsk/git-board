import { Host } from 'src/config/hosts';
import { auth } from './auth';
import { Rest, AbortablePromise } from './rest';

export interface User {
  avatar_url: string;
  login: string;
  name: string;
  type: 'User';
}

export const UserApi = {
  authorize: () => auth.authorize(),
  logout: () => auth.logout(),

  // to local separate server
  getAccessToken: (code: string): Promise<string> => {
    return Rest.httpGet<{ access_token: string; type: 'bearer' }>(`/login/access-code?code=${code}`).promise.then(
      resp => {
        auth.setAccessToken(resp.data.access_token);
        return resp.data.access_token;
      },
    );
  },

  fetchUser: (): AbortablePromise<User | void> => {
    if (!auth.getAccessToken()) {
      return Rest.noopAbortablePromise();
    }
    return Rest.httpGet<User>(`${Host.GitApi}/user`);
  },

  getEvents: (username: string) => {
    return Rest.httpGet(`/api/users/${username}/received_events`);
  },

  /* 
  {
    viewer {
      login
      name
      organizations(first: 100) {
        nodes {
          login
          url
          repositories(first: 30, isLocked: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
            nodes {
              name
              url
              updatedAt
              pullRequests(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
                nodes {
                  closed
                  author {
                    login
                    avatarUrl
                    url
                  }
                  createdAt
                  state
                  url
                  title
                }
              }
            }
          }
        }
      }
    }
  }

  {
    search(query: "fork:false archived:false org:apptentive sort:updated-desc", type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          id
          name
          createdAt
          pushedAt
          updatedAt
          pullRequests(first: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
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

  */
  getAllPullRequests: () => {
    return Rest.httpGet('/api/user/memberships/orgs').promise.then(async resp => {
      const orgs = resp.data.map((org: any) => org.organization.login) as string[];
      const pulls = await Promise.allSettled(
        orgs.map(async org => {
          const orgRepos = await Rest.httpGet(`/api/orgs/${org}/repos`, {
            params: {
              sort: 'updated',
              direction: 'desc',
              per_page: 20,
            },
          }).promise.then(r => r.data);

          const orgsPulls = await Promise.allSettled<any[]>(
            orgRepos.map((repo: any, idx: number) => {
              return new Promise(resolve => {
                setTimeout(() => {
                  Rest.httpGet(`/api/repos/${repo.owner.login}/${repo.name}/pulls`, {
                    params: {
                      sort: 'updated',
                      direction: 'desc',
                      per_page: 15,
                    },
                  })
                    .promise.then(r => r.data)
                    .then(resolve);
                }, idx * 1000);
              });
            }),
          );
          return orgsPulls.map((r: any) => r.value);
        }),
      );

      return pulls.reduce<any>((res, p: any) => [...res, ...p.value], []).flat();
    });
  },
};
