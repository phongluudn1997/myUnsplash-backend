const cloudinary = require("cloudinary").v2;
import config from "../config";
import DatauriParser from "datauri/parser";

class Cloudinary {
  cloudName: string = config.cloudinary.cloudName;
  apiKey: string = config.cloudinary.apiKey;
  apiSecret: string = config.cloudinary.apiSecret;
  parser: DatauriParser;

  constructor() {
    this.parser = new DatauriParser();
  }

  getCloudinaryInstance() {
    const { cloudName, apiKey, apiSecret } = this;
    cloudinary.config({ cloudName, apiKey, apiSecret });
    return cloudinary;
  }

  async uploadImage(file: any) {
    const { path } = file;
    const res = await this.getCloudinaryInstance().uploader.upload(path);
    return res.secure_url;
  }
}

export { Cloudinary };
export default new Cloudinary();
