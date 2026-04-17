import * as winston from 'winston';

import 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, json, errors } = winston.format;

const consoleFormat = combine(
  colorize(),
  timestamp(),
  errors({ stack: true }),
  printf(({ timestamp: ts, level, message, stack, ...meta }) => {
    const msg = stack || message;
    const { context = 'unknown', ...restMeta } = meta;
    const metaString = Object.keys(restMeta).length
      ? '\n' + JSON.stringify(restMeta, null, 2)
      : '';
    return `[${ts} - ${context}] ${level}: ${msg}${metaString}`;
  }),
);

const fileFormat = combine(timestamp(), errors({ stack: true }), json());

export function createLogger(): winston.Logger {
  const env = process.env.NODE_ENV ?? 'development';
  const service = process.env.SERVICE_NAME ?? 'cals-backend';

  const transports: winston.transport[] = [];

  if (env === 'development') {
    transports.push(
      new winston.transports.Console({
        format: consoleFormat,
        handleExceptions: true,
        handleRejections: true,
      }),
    );
  }

  transports.push(
    new winston.transports.DailyRotateFile({
      dirname: 'logs/app',
      filename: 'application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      zippedArchive: true,
      handleExceptions: true,
      handleRejections: true,
      format: combine(
        fileFormat,
        winston.format((info) => ({ ...info, env, service }))(),
      ),
    }),
  );

  return winston.createLogger({
    level: env === 'development' ? 'debug' : 'info',
    transports,
    exitOnError: false,
  });
}
