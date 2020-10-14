import express, { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../middlewares";
const router = express.Router();

import upload from "../helper/multer";
import minioClient from "../helper/minio";
import { Photo } from "../schemas/photo";
import fs from "fs";
import { checkToken } from "../middlewares/checkToken";
import PhotoService from "../services/photo.service";
import { CreatedResponse } from "../common/response/created.response";

router.post(
  "/",
  upload.single("photo"),
  checkToken,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { filename, path } = req.file;
    await minioClient.fPutObject(process.env.BUCKET_NAME, filename, path, {});
    fs.unlinkSync(path);

    const { label } = req.body;
    const photoService = new PhotoService(Photo);
    const isSave = await photoService.uploadPhoto({
      label,
      filename,
      author: req.currentUser._id,
    });

    if (isSave) {
      return new CreatedResponse({}).send(res);
    }
  })
);

export default router;
