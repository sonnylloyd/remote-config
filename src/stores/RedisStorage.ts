// src/storage/RedisStorage.ts

import { IStorage } from "./IStorage";
import { createClient, RedisClientType } from "redis";
import { config } from "./../config"; // Importing the config object

export class RedisStorage implements IStorage {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: `redis://${config.redisHost}:${config.redisPort}`,
      password: config.redisPassword, // Optional if Redis is password-protected
    });

    // Error handling
    this.client.on("error", (err: Error) => {
      console.error("Redis error:", err);
    });

    // Success connection message
    this.client.on("connect", () => {
      console.log("Redis client connected");
    });

    // Connect to Redis server
    this.client.connect().catch(console.error);
  }

  async set(key: string, data: string): Promise<void> {
    try {
      await this.client.set(key, data);
    } catch (err) {
      console.error("Error setting data in Redis:", err);
      throw new Error("Failed to set data in Redis");
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      const data = await this.client.get(key);
      return data ?? null;
    } catch (err) {
      console.error("Error getting data from Redis:", err);
      throw new Error("Failed to get data from Redis");
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error("Error deleting data in Redis:", err);
      throw new Error("Failed to delete data from Redis");
    }
  }

  close(): void {
    this.client.quit().catch(console.error);
  }
}
