import multer from "multer";
const upload = multer({
  dest: "temp/",
  limits: {
    fieldSize: 8 * 1024 * 1024,
  },
});

export default upload;
