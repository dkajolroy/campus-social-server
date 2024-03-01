export interface UploadContent {
  public_id: string;
  secure_url: string;
}
export interface IComment {
  author: Object;
  post: Object;
  text?: string;
  image?: UploadContent;
  sticker?: string;
  createdAt?: string;
}
