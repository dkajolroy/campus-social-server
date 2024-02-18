import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: "String",
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    lastName: {
      type: "String",
      maxlength: 30,
    },
    username: {
      type: "String",
      minlength: 4,
      maxlength: 30,
      unique: true,
      required: true,
    },
    avatar: {
      type: "String",
      default:
        "https://res.cloudinary.com/kajolroy/image/upload/v1707939639/dummy/default-avatar-profile-icon-vector_rzhkkm.jpg",
    },
    email: {
      type: "String",
      unique: true,
      minlength: 5,
      maxlength: 200,
      required: true,
    },
    phone: {
      type: "String",
      maxlength: 20,
    },
    dateOfBirth: {
      type: Date,
    },
    bio: {
      type: "String",
      maxlength: 250,
    },
    verifiedEmail: { type: "Boolean", default: false },
    verifiedPhone: { type: "Boolean", default: false },
    password: { type: "String", minlength: 4, required: true, maxlength: 100 },
    onetimeKey: { type: "Number" },
    relationShip: {
      type: "String",
      default: "Single",
      enum: ["Single", "Married", "In a Relationship"],
    },
    city: { type: "String" },
    country: { type: "String" },
    social: {
      facebook: { type: "String" },
      youtube: { type: "String" },
      github: { type: "String" },
      web: { type: "string" },
      contactMail: { type: "String" },
    },
  },
  { timestamps: true, versionKey: false }
);

export const userModel = model("users", userSchema);
interface DocumentResult<T> {
  _doc: T;
}
interface IUser extends DocumentResult<IUser> {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  verifiedEmail: boolean;
  verifiedPhone: boolean;
  onetimeKey: number;
  avatar: string;
  dateOfBirth?: Date;
  bio: string;
  relationShip: "Single" | "Married" | "In a Relationship";
  city: string;
  country: string;
  social: {
    facebook: string | null;
    github: string | null;
    web: string | null;
    youtube: string | null;
    contactMail: string | null;
  };
}
