import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import Redis, { type RedisOptions } from 'ioredis';
import { getRedisConfig } from './redis.config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name);
  private readonly client: Redis;

  constructor() {
    const config = getRedisConfig();
    const options: RedisOptions = {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      // En producción: REDIS_PASSWORD del .env (también aplica si hay REDIS_URL)
      ...(config.password ? { password: config.password } : {}),
      ...(config.tls ? { tls: {} } : {}),
    };

    this.client = config.url
      ? new Redis(config.url, options)
      : new Redis({
          host: config.host,
          port: config.port,
          ...options,
        });

    this.client.on('error', (err) => {
      this.logger.error(`Redis error: ${err.message}`);
    });
  }

  async onModuleInit(): Promise<void> {
    await this.client.connect();
    const pong = await this.client.ping();
    this.logger.log(`Redis conectado (${pong})`);
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }

  /** Acceso al cliente ioredis para operaciones avanzadas. */
  getClient(): Redis {
    return this.client;
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds != null && ttlSeconds > 0) {
      await this.client.set(key, value, 'EX', ttlSeconds);
      return;
    }
    await this.client.set(key, value);
  }

  async del(key: string): Promise<number> {
    return this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.client.exists(key)) === 1;
  }

  async getJson<T>(key: string): Promise<T | null> {
    const raw = await this.get(key);
    if (raw == null) {
      return null;
    }
    return JSON.parse(raw) as T;
  }

  async setJson(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
    await this.set(key, JSON.stringify(value), ttlSeconds);
  }
}
