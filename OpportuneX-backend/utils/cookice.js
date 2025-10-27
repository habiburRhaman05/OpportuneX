const logger = require("./logger");

exports.sendCookie = async (res, cookieName, token) => {
  try {

    await res.cookie(
      cookieName,
      token,
      {
        httpOnly: true,
        secure: false, // Set to true in production (with HTTPS)
        sameSite: "Lax", // Or 'None' if frontend & backend are different origins
        maxAge: 1000 * 60 * 30, // ✅ 2 minutes in milliseconds (not seconds)
      }
    );


    return true;
  } catch (error) {
  

    throw new ErrorHandler("failed to sending cookice", 400);
  }
};
