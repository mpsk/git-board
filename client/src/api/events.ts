import { Rest } from './rest';

export const EventsApi = {
  get: () => Rest.httpGet('api/events'),
};
