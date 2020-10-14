import dotenv from "dotenv";

const envFound = dotenv.config();
if (!envFound) {
  throw Error("Couln't find .env file!");
}

export default {
  port: parseInt(process.env.PORT),
  dbUrl: process.env.DB_URL,

  jwtSecret: process.env.JWT_SECRET,

  minio: {
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    bucket: process.env.MINIO_BUCKET_NAME,
  },
};
