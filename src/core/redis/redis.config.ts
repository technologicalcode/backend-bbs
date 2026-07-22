export interface RedisConfig {
  /** true cuando NODE_ENV=production → solo REDIS_URL */
  isProduction: boolean;
  host: string;
  port: number;
  password?: string;
  url?: string;
  /** true si la URL es rediss:// o REDIS_TLS=true */
  tls: boolean;
}

export function getRedisConfig(): RedisConfig {
  const isProduction = process.env.NODE_ENV === 'production';
  const url = process.env.REDIS_URL?.trim() || undefined;
  const password = process.env.REDIS_PASSWORD?.trim() || undefined;
  const tlsEnv = process.env.REDIS_TLS?.trim().toLowerCase();

  if (isProduction) {
    if (!url) {
      throw new Error(
        'En producción REDIS_URL es obligatoria para conectar a Redis',
      );
    }

    const tls =
      tlsEnv === 'true' ||
      tlsEnv === '1' ||
      url.startsWith('rediss://');

    return {
      isProduction: true,
      host: '',
      port: 0,
      password,
      url,
      tls,
    };
  }

  // Desarrollo / local: host + puerto (Docker), sin REDIS_URL
  return {
    isProduction: false,
    host: process.env.REDIS_HOST?.trim() || '127.0.0.1',
    port: Number(process.env.REDIS_PORT ?? 6379),
    password,
    url: undefined,
    tls: tlsEnv === 'true' || tlsEnv === '1',
  };
}
