import NodeCache from 'node-cache';

export class CacheService {
  private cache = new NodeCache({ stdTTL: 3600 });

  // Generic set method
  set<T>(key: string, value: T, ttl?: number): void {
    if (ttl !== undefined) {
      this.cache.set<T>(key, value, ttl);
    } else {
      this.cache.set<T>(key, value);
    }
  }

  // Generic get method
  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  del(key: string): void {
    this.cache.del(key);
  }

  flush(): void {
    this.cache.flushAll();
  }
}