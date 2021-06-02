import { Router } from 'express';
import axios from 'axios';
import { HOST } from '../config';
import { generateGetParams } from '../utils';

export const gitLoginRouter = Router();

const GIT_HOST = HOST.GIT_HOST;

/**
 * https://docs.github.com/en/developers/apps/authorizing-oauth-apps#1-request-a-users-github-identity
 * https://docs.github.com/en/rest/overview/endpoints-available-for-github-apps
 */
gitLoginRouter.get('/login/access-code', (req, res) => {
  const requestToken = req.query.code;
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: requestToken,
  };

  if (!requestToken) {
    res.status(500).send({ msg: 'query param "code" is required' });
  }

  if (!params.client_id || !params.client_secret) {
    res.status(500).send({ msg: 'some params are required' });
  }

  axios({
    method: 'POST',
    url: `${GIT_HOST}/login/oauth/access_token?${generateGetParams(params)}`,
    headers: {
      accept: 'application/json',
    },
  })
    .then((resp) => {
      res.send({
        access_token: resp.data.access_token,
        type: resp.data.token_type,
      });
    })
    .catch((err: Error) => {
      res.status(500).send(err.toString());
    });
});
