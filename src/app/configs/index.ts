import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  databaseUrl: process.env.MONGODB_DATABASE_PRODUCTION_URL,
  saltRound: process.env.BCRYPT_SALT_ROUND,
  jwtAccessTokenSecretKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
  jwtRefreshTokenSecretKey: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
  jwtAccessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
  adminEmail: process.env.ADMIN_EMAIL,
  NODE_ENV: process.env.NODE_ENV,
};
