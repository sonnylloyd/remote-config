export interface IStorage {
  set(key: string, data: string): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<void>;
  close(): void;
}
