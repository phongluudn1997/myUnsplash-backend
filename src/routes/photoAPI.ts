import express, { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../middlewares";
const router = express.Router();

import upload from "../helper/multer";
import minioClient from "../helper/minio";
import { Photo } from "../schemas/photo";
import { checkToken } from "../middlewares/checkToken";
import PhotoService from "../services/photo.service";
import { CreatedResponse } from "../common/response/created.response";
import { OkResponse } from "../common/response/ok.response";

router.post(
  "/",
  upload.single("photo"),
  checkToken,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file);
    const { filename, path } = req.file;
    const { label } = req.body;
    const photoService = new PhotoService(Photo, minioClient);
    const isSave = await photoService.uploadPhoto({
      label,
      filename,
      author: req.currentUser._id,
      path,
    });

    if (isSave) {
      return new CreatedResponse({}).send(res);
    }
  })
);

router.get(
  "/",
  checkToken,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.currentUser;
    const photoService = new PhotoService(Photo, minioClient);
    const listPhotos = await photoService.getPhotosOfUser(_id);
    return new OkResponse({ data: { listPhotos } }).send(res);
  })
);

export default router;
