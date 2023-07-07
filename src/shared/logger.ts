import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format
import path from 'path'

// Custom log formatter
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `[Level: ${label}] ${level} \n\nTimestamp: (${date.toDateString()})-> ⏲ ${hour}:${minutes}:${seconds}\n\nMessage: ${message}\n\n\n`
})
const logger = createLogger({
  level: 'info',
  format: combine(
    label({
      label: 'INFO',
    }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'success.log'),
      level: 'info',
    }),
  ],
})
const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({
      label: 'ERROR',
    }),
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(process.cwd(), 'logs', 'winston', 'error.log'),
    }),
  ],
})

export { logger, errorLogger }
