export interface UploadContent {
  public_id: string;
  secure_url: string;
  resource_type: "image" | "video";
}
export interface IComment {
  author: Object;
  post: Object;
  text?: string;
  image?: UploadContent;
  sticker?: string;
  createdAt?: string;
}
