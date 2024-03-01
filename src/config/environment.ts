export function envConfig() {
  const {
    PORT,
    SECRETE_KEY,
    FRONTEND_URL,
    NODEMAILER_EMAIL,
    NODEMAILER_KEY,
    DATABASE_URL,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
  } = process.env;
  if (!PORT) {
    console.log("⚡Please set a PORT");
  }
  if (!DATABASE_URL) {
    console.log("⚡DATABASE_URL not set");
    throw new Error("Set DATABASE_URL into env");
  }
  if (!SECRETE_KEY) {
    console.log("⚡SECRETE_KEY not set");
    throw new Error("Set SECRETE_KEY into env");
  }
  if (!NODEMAILER_EMAIL) {
    console.log("NODEMAILER_EMAIL not set");
    throw new Error("Set NODEMAILER_EMAIL into env");
  }
  if (!NODEMAILER_KEY) {
    console.log("NODEMAILER_KEY not set");
    throw new Error("Set NODEMAILER_KEY into env");
  }
  if (!FRONTEND_URL) {
    console.log("FRONTEND_URL not set");
    throw new Error("Set FRONTEND_URL into env");
  }
  if (!CLOUDINARY_CLOUD_NAME) {
    console.log("CLOUDINARY_CLOUD_NAME not set");
    throw new Error("Set CLOUDINARY_CLOUD_NAME into env");
  }
  if (!CLOUDINARY_API_KEY) {
    console.log("CLOUDINARY_API_KEY not set");
    throw new Error("Set CLOUDINARY_API_KEY into env");
  }
  if (!CLOUDINARY_API_SECRET) {
    console.log("CLOUDINARY_API_SECRET not set");
    throw new Error("Set CLOUDINARY_API_SECRET into env");
  }
}
