import mongoose from "mongoose";

export default async function dbConfig() {
  try {
    //database config
    mongoose.connect(process.env.DATABASE_URL).then(() => {
      console.log("Mongo🎉 DB connected !");
    });
  } catch (error) {
    console.log("Database connection failed !");
  }
}
