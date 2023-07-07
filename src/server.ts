import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
async function databaseConnection() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
    logger.info('🛢 Database Connected Successfully ⚙')
  } catch (e) {
    errorLogger.error('Failed to connect database!💀', e)
  }
}
databaseConnection()
