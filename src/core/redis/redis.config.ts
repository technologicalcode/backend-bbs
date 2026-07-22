export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
  url?: string;
}

export function getRedisConfig(): RedisConfig {
  const url = process.env.REDIS_URL?.trim();
  const password = process.env.REDIS_PASSWORD?.trim() || undefined;

  return {
    host: process.env.REDIS_HOST?.trim() || '127.0.0.1',
    port: Number(process.env.REDIS_PORT ?? 6379),
    password,
    url: url || undefined,
  };
}
