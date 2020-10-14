import * as Minio from "minio";
import config from "../config";
const minioClient = new Minio.Client({
  endPoint: "play.min.io",
  port: 9000,
  useSSL: true,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey,
});

export default minioClient;
