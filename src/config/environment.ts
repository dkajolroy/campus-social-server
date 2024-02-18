export function envConfig() {
  const { PORT, SECRETE_KEY, SENDGRID_API_KEY, DATABASE_URL } = process.env;
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
  if (!SENDGRID_API_KEY) {
    console.log("SENDGRID_API_KEY not set");
    throw new Error("Set SENDGRID_API_KEY into env");
  }
}
