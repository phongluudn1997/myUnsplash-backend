import express, { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../middlewares";
const router = express.Router();

import upload from "../helper/multer";
import { checkToken } from "../middlewares/checkToken";
import PhotoService from "../services/photo.service";
import { OkResponse } from "../common/response/ok.response";

router.post(
  "/",
  upload.single("photo"),
  checkToken,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file as any;
    const { label } = req.body;
    const photoService = new PhotoService();
    const url = await photoService.uploadPhoto({
      file,
      label,
      author: req.currentUser._id,
    });
    return new OkResponse({ data: { url } }).send(res);
  })
);

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const photoService = new PhotoService();
    const photos = await photoService.getPhotos();
    return new OkResponse({ data: { photos } }).send(res);
  })
);

router.get(
  "/my-photos",
  checkToken,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.currentUser;
    const photoService = new PhotoService();
    const listPhotos = await photoService.getPhotosOfUser(_id);
    return new OkResponse({ data: { listPhotos } }).send(res);
  })
);

export default router;
