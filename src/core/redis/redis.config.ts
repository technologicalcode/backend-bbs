export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  url?: string;
  /** true si la URL es rediss:// o REDIS_TLS=true */
  tls: boolean;
}

export function getRedisConfig(): RedisConfig {
  const url = process.env.REDIS_URL?.trim() || undefined;
  const password = process.env.REDIS_PASSWORD?.trim() || undefined;
  const tlsEnv = process.env.REDIS_TLS?.trim().toLowerCase();
  const tls =
    tlsEnv === 'true' || tlsEnv === '1' || Boolean(url?.startsWith('rediss://'));

  return {
    host: process.env.REDIS_HOST?.trim() || '127.0.0.1',
    port: Number(process.env.REDIS_PORT ?? 6379),
    password,
    url,
    tls,
  };
}
