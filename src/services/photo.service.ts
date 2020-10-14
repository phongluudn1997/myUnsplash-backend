import upload from "helper/multer";
import { Models } from "../../@types/express";
import { IUploadPhotoDTO } from "../interfaces/IPhoto";

export default class PhotoService {
  photoModel: Models.PhotoModel;
  constructor(photoModel: Models.PhotoModel) {
    this.photoModel = photoModel;
  }

  public async uploadPhoto(uploadPhotoDTO: IUploadPhotoDTO) {
    await this.photoModel.create(uploadPhotoDTO);
    return true;
  }
}
