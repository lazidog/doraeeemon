// biome-ignore lint/suspicious/noExplicitAny:
type Class<T> = new (...args: any[]) => T;

// biome-ignore lint/suspicious/noExplicitAny:
const container = new Map<string, any>();

export function register<T>(key: string, value: T): void {
  container.set(key, value);
  console.log({ container, key });
}

export function resolve<T>(key: string): T {
  console.log({ container, key });

  const value = container.get(key);
  if (!value) {
    throw new Error(`No dependency found for key: ${key}`);
  }
  if (typeof value === "function") {
    return new (value as Class<T>)();
  }
  return value as T;
}
