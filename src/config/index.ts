// src/config/config.ts

import dotenv from "dotenv";

// Load environment variables from the .env file
dotenv.config();

interface Config {
  port: string;
  redisHost: string;
  redisPort: string;
  redisPassword: string | undefined;
  domain: string;
  username: string;
  password: string;
  authentication: boolean;
}

// Default configuration values that will be used if env variables are not set
const defaultConfig: Config = {
  port: "3000",
  redisHost: "localhost",
  redisPort: "6379",
  redisPassword: undefined, // If Redis is password-protected, set a value here
  domain: "example.com", // Provide a default domain
  username: "defaultUsername",
  password: "defaultPassword",
  authentication: true,
};

// Exporting the final configuration
export const config: Config = {
  port: process.env.PORT || defaultConfig.port,
  redisHost: process.env.REDIS_HOST || defaultConfig.redisHost,
  redisPort: process.env.REDIS_PORT || defaultConfig.redisPort,
  redisPassword: process.env.REDIS_PASSWORD || defaultConfig.redisPassword,
  domain: process.env.DOMAIN || defaultConfig.domain,
  username: process.env.BASIC_AUTH_USERNAME || defaultConfig.username,
  password: process.env.BASIC_AUTH_PASSWORD || defaultConfig.password,
  authentication:
    Boolean(process.env.AUTHENTICATION_ON) || defaultConfig.authentication,
};
