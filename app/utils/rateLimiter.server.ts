// app/utils/rateLimiter.server.ts
const memoryStore = new Map<string, { count: number; timestamp: number }>();

export async function createRateLimiter(
  key: string,
  maxRequests: number,
  windowSeconds: number
): Promise<{ success: boolean }> {
  const now = Date.now();
  const record = memoryStore.get(key);

  if (!record) {
    memoryStore.set(key, { count: 1, timestamp: now });
    return { success: true };
  }

  const timeElapsed = (now - record.timestamp) / 1000;

  if (timeElapsed > windowSeconds) {
    memoryStore.set(key, { count: 1, timestamp: now });
    return { success: true };
  }

  if (record.count >= maxRequests) {
    return { success: false };
  }

  record.count += 1;
  memoryStore.set(key, record);
  return { success: true };
}
