import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const host = process.env.DATABASE_HOST || 'localhost';
  const port = parseInt(process.env.DATABASE_PORT ?? '5432') || 5432;
  const username = process.env.DATABASE_USER;
  const password = process.env.DATABASE_PASSWORD;
  const database = process.env.DATABASE_NAME;
  const url = process.env.DATABASE_URL;

  const commonConfig = {
    type: 'postgres' as const,
    synchronize: false,
    autoLoadEntities: false,
  };

  const databaseConfig = url
    ? { url, ...commonConfig }
    : { host, port, username, password, database, ...commonConfig };

  return { databaseConfig };
});
