export const server_config = {
  appName: "Campus", // use like email template
  authCookieName: "CAMPUS_ACCESS",
  clientCookieName: "CAMPUS_CLIENT", // access from frontend to protect
  cookieExpire: 1000 * 60 * 60 * 24 * 30, // 30 day
};
