import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

/** URL por defecto cuando Postgres corre con Docker en local (`npm run db:up`). */
const LOCAL_DATABASE_URL =
  'postgresql://postgres:postgres@127.0.0.1:5432/bbs';

export function getTypeOrmConfig(): TypeOrmModuleOptions {
  const databaseUrl =
    process.env.DATABASE_URL?.trim() ||
    (process.env.NODE_ENV !== 'production' ? LOCAL_DATABASE_URL : '');

  if (!databaseUrl) {
    throw new Error(
      'DATABASE_URL es obligatoria. En local: npm run db:up y define DATABASE_URL en .env',
    );
  }

  return {
    type: 'postgres',
    url: databaseUrl,
    autoLoadEntities: true,
    synchronize: process.env.TYPEORM_SYNC !== 'false',
    retryAttempts: 5,
    retryDelay: 2000,
  };
}
