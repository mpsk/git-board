import express, { Request } from 'express';
const cors = require('cors');
import { gitLoginRouter, gitApiRouter } from './src/routes';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 2400;

app.set('view engine', 'ejs');

app.use(
  cors({
    origin: (origin: string, callback: any) => {
      if (!origin) {
        return callback(null, true);
      }
      const origins = (process.env.CORS_ORIGIN || '').split(',');
      if (origins.indexOf(origin) === -1) {
        return callback(`CORS policy mismatch with origins: ${origin}`, false);
      }
      return callback(null, true);
    },
  })
);

app.use('/test', (req, res) => res.send({ msg: 'Test Hello' }));
app.use('/', gitLoginRouter);
app.use('/', gitApiRouter);

app.listen(port, () => console.log('App listening on port ' + port));
