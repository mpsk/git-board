import React, { useCallback, useEffect, useReducer } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { auth } from 'src/api/auth';
import { UserApi, User } from 'src/api/user';

interface GitHubAuthContextData {
  accessToken?: string;
  user?: User;
  errorMsg?: string;
  login(): void;
  logout(): void;
}

const DEFAULT_STATE: Omit<GitHubAuthContextData, 'login' | 'logout'> = {};

const GitHubAuthContext = React.createContext<GitHubAuthContextData>({
  ...DEFAULT_STATE,
  login: () => null,
  logout: () => null,
});

enum ActionType {
  SET_TOKEN = 'SET_TOKEN',
  SET_USER = 'SET_USER',
}

interface AuthAction {
  type: ActionType;
  payload: Partial<Record<keyof typeof DEFAULT_STATE, any>>;
}

// Context
export const GitHubAuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(gitHubAuthReducer, {
    ...DEFAULT_STATE,
    accessToken: auth.getAccessToken(),
  });
  const history = useHistory();
  const location = useLocation();

  const login = useCallback(() => UserApi.authorize(), []);
  const logout = useCallback(() => UserApi.logout(), []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code) {
      history.replace('/');
      UserApi.getAccessToken(code)
        .then(accessToken => dispatch({ type: ActionType.SET_TOKEN, payload: { accessToken } }))
        .catch(err => console.warn('getAccessToken: ', err));
    }
  }, [history, location]);

  useEffect(() => {
    if (state.user || !state.accessToken) {
      return;
    }
    const { promise, cancel } = UserApi.fetchUser();
    promise
      .then(resp => dispatch({ type: ActionType.SET_USER, payload: { user: resp.data } }))
      .catch(err => console.warn('fetchUser: ', err));
    return () => cancel();
  }, [state.user, state.accessToken]);

  return <GitHubAuthContext.Provider value={{ ...state, login, logout }} children={children} />;
};

export const useGitHubAuthContext = () => React.useContext(GitHubAuthContext);

// Reducer
function gitHubAuthReducer(state: typeof DEFAULT_STATE, action: AuthAction) {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case ActionType.SET_TOKEN:
      return { ...state, accessToken: action.payload.accessToken };
    default:
      console.warn('action type not described: ', action);
      return state;
  }
}
