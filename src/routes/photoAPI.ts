import express, { Request, Response, NextFunction } from "express";

import { asyncHandler } from "../middlewares";
const router = express.Router();

import upload from "../helper/multer";
import minioClient from "../helper/minio";
import { Photo } from "../schemas/photo";
import fs from "fs";

router.post(
  "/",
  upload.single("photo"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { filename, path } = req.file;
    await minioClient.fPutObject(process.env.BUCKET_NAME, filename, path, {});
    fs.unlinkSync(path);

    const { label, author } = req.body;
    const photo = await Photo.create({
      label,
      author,
      url: process.env.S3_HOST + filename,
    });
    return res.status(200).json({
      message: "Success",
      data: photo,
    });
  })
);

export default router;