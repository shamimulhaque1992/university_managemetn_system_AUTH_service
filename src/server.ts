import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
async function databaseConnection() {
  try {
    await mongoose.connect(config.database_url as string)
    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
    console.log('🛢 Database Connected Successfully ⚙')
  } catch (e) {
    console.log('Failed to connect database!💀', e)
  }
}
databaseConnection()
