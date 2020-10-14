import { Models } from "../../@types/express";
import { IUploadPhotoDTO } from "../interfaces/IPhoto";
import Minio from "minio";
import fs from "fs";
import config from "../config";

export default class PhotoService {
  photoModel: Models.PhotoModel;
  minioClient: Minio.Client;
  constructor(photoModel: Models.PhotoModel, minioClient: Minio.Client) {
    this.photoModel = photoModel;
    this.minioClient = minioClient;
  }

  public async uploadPhoto(uploadPhotoDTO: IUploadPhotoDTO) {
    const { path, filename, author, label } = uploadPhotoDTO;
    await this.minioClient.fPutObject(config.minio.bucket, filename, path, {});
    fs.unlinkSync(path);

    const isSave = await this.photoModel.create({ filename, author, label });
    return !!isSave;
  }
}
