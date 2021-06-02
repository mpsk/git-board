import { pick } from 'lodash';
import axios, { AxiosResponse, Method, AxiosError, AxiosRequestConfig } from 'axios';
import { auth } from './auth';

export interface AbortablePromise<T> {
  promise: Promise<AxiosResponse<T>>;
  cancel: () => void;
}

interface RequestConfig extends Pick<AxiosRequestConfig, 'headers' | 'params' | 'data'> {}

export class Rest {
  static httpGet = httpGet;
  static httpPut = httpPut;
  static httpPost = httpPost;
  static httpDelete = httpDelete;

  static noopAbortablePromise = (): AbortablePromise<void> => {
    return {
      promise: Promise.resolve({ data: null }) as Promise<AxiosResponse<any>>,
      cancel: () => null,
    };
  };
}

// Github
const abortableRequest = <T = any>(method: Method, url: string, config: RequestConfig = {}): AbortablePromise<T> => {
  const ctx = axios.CancelToken.source();
  const promise = axios.request<T>({
    method,
    url,
    headers: {
      get Authorization() {
        const accessToken = auth.getAccessToken();
        return accessToken ? `token ${accessToken}` : undefined;
      },
      ...(config.headers || {}),
    },
    ...pick(config, ['params', 'data'] as (keyof RequestConfig)[]),
    cancelToken: ctx.token,
  });

  promise.catch((err: AxiosError) => {
    if (isAbortError(err)) {
      return;
    }
    if (err.response?.status === 401 && auth.getAccessToken()) {
      auth.destroy();
      auth.authorize();
    }
    throw err;
  });

  return {
    promise,
    cancel: () => ctx.cancel(),
  };
};

function isAbortError(err: AxiosError): boolean {
  console.warn(err.name);
  return !!err && err.name === 'AbortError';
}

function httpGet<T = any>(url: string, config?: RequestConfig): AbortablePromise<T> {
  return abortableRequest('GET', url, config);
}

function httpPost() {
  throw Error('httpPost not defined');
}

function httpPut() {
  throw Error('httpPut not defined');
}

function httpDelete() {
  throw Error('httpDelete not defined');
}
