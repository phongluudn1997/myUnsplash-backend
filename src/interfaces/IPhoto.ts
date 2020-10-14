export interface IPhoto {
  _id: string;
  filename: string;
  author: string;
  label: string;
}

export interface IUploadPhotoDTO {
  filename: string;
  author: string;
  label: string;
}
