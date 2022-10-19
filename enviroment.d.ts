import { Secret } from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      TOKEN_KEY: Secret;
      TOKEN_VALIDATION_TIME: number;
      REFRESH_TOKEN_SECRET: Secret;
      PORT: number;
      /** in minutes */
      RESET_PASSWORD_DELAY: number;
      SENDGRID_API_KEY: string;
      GOOGLE_CLIENT_ID: string;
    }
  }
}
