import { Models } from "../../@types/express";
import { IUploadPhotoDTO } from "../interfaces/IPhoto";
import Minio from "minio";
import fs from "fs";
import config from "../config";
import cloudinary, { Cloudinary } from "../helper/cloudinary";
import photoModel from "../schemas/photo/photo.model";

export default class PhotoService {
  photoModel: Models.PhotoModel;
  minioClient: Minio.Client;
  cloudinary: Cloudinary;
  constructor() {
    this.photoModel = photoModel;
    this.cloudinary = cloudinary;
  }

  public async uploadPhoto(uploadPhotoDTO: IUploadPhotoDTO) {
    const { file, author, label } = uploadPhotoDTO;
    const { path } = file;
    const url = await this.cloudinary.uploadImage(file);
    fs.unlinkSync(path);

    await this.photoModel.create({ url, author, label });
    return url;
  }

  public async getPhotosOfUser(_id: string) {
    const listPhotos = await this.photoModel.find({ author: _id });
    const listPromises = listPhotos.map((photo) =>
      this.minioClient.presignedGetObject(config.minio.bucket, photo.url)
    );
    const listPaths = await Promise.all(listPromises);
    return listPaths;
  }
}
