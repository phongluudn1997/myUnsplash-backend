export interface IPhoto {
  _id: string;
  url: string;
  author: string;
  label: string;
}

export interface IUploadPhotoDTO {
  file: any;
  author: string;
  label: string;
}
