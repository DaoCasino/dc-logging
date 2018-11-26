import { format } from "date-fns"
// import WinstonGraylog2 from "winston-graylog2"

const getGraylogServerOptions = () => {
  if (process.env.GRAYLOG_HOST) {
    return { host: process.env.GRAYLOG_HOST, port: 12201 }
  }

  return null
}

const GraylogServerOptions = getGraylogServerOptions()

type Log = { message?: string; [key: string]: any } | string

class Logger {
  _name: string
  static _logger: any

  constructor(name: string) {
    this._name = name
    if (!Logger._logger) {
      Logger._logger = console
      // Logger._logger = new winston.Logger({
      //   transports
      // })
    }
  }

  error = console.error

  warn = console.warn

  info = console.info

  debug = console.debug

  table = console.table

  _getLogMessage(log: Log) {
    const timestamp = format(Date.now(), "DD.MM HH:mm:ss")

    if (typeof log === "object") {
      const { message, ...rest } = log

      return `${this._name}: ${timestamp}-${message} ${JSON.stringify(rest)}`
    }

    return `${this._name}: ${timestamp}-${log}`
  }
}

export { Logger }
