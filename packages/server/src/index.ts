import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';

import { app as appSettings } from '@neiv/config';
import { log, queryLog } from '@neiv/logger';
import { responseModifier, userDetails } from '@neiv/middlewares';
import { knex } from '@neiv/db';
import routing from '@neiv/routing';
import StorageService from '@neiv/config/storageService';

dotenv.config({ path: '../../.env' });

// These options are must needed so that we can restrict
// All the other domain requests and just allow limited
// hosts to access this server
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    log.info({ origin });
    log.info('HOSTS', appSettings.allowedHosts);
    if (
      !(appSettings.allowedHosts || []).length ||
      (appSettings.allowedHosts || []).includes(origin as string) ||
      !origin
    ) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

const app = express();
// To prevent exposing server details
app.use(helmet());
// Allow json requests

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(morgan('[:status] :method :url - :response-time ms'));
app.use(responseModifier);
app.use(userDetails);

// Storage Service
const storageService = new StorageService();
storageService.createBuckets();

// Actual implemented routes
app.use(routing);

// Start the server only after checking the valid connection
// to the database
log.info('Trying to connect with the database');
knex
  .raw('SELECT 1')
  .then(() => {
    queryLog();
    app.listen(appSettings.port, () => {
      log.info(`⚡️ Server is running at port ${appSettings.port}`);
    });
  })
  .catch(err => {
    log.error('Unable to connect with the database', err);
  });

app.get('/', (req: Request, res: Response) => {
  res.send('App is up and running');
});

process.on('unhandledRejection', reason => {
  log.error('Unhandled promise rejection thrown: ');
  log.error(reason);
  process.exit(1);
});
