import { Router } from 'express';
import proxy from 'express-http-proxy';
import { HOST } from '../config';

export const gitApiRouter = Router();

gitApiRouter.use('/api', proxy(HOST.GIT_API_HOST));
