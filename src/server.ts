import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;
async function databaseConnection() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
    logger.info('🛢 Database Connected Successfully ⚙');
  } catch (e) {
    errorLogger.error('Failed to connect database!💀', e);
  }

  process.on('unhandledRejection', error => {
    console.log(
      'Unhandled Rejection is detected, we are closing our server.....'
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
databaseConnection();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
