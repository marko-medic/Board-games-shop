const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    // check header or url parameters or post parameters for token
    const token = req.headers["x-access-token"];
    if (!token) throw new Error("FORBIDDEN");
    // verifies secret and checks exp
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, decoded) => {
      if (err) {
        if (err.message === "jwt expired") {
          throw new Error("EXPIRED");
        } else {
          throw new Error("FORBIDDEN");
        }
      }
      if (!decoded) {
        throw new Error("FORBIDDEN");
      }
      // if everything is good, save to request for use in other routes
      req.user = decoded;
      return next();
    });
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
      error: err
    });
  }
};

const checkAdminAuth = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      throw new Error("FORBIDDEN");
    }
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
      error: err
    });
  }
  return next();
};

module.exports = {
  checkToken,
  checkAdminAuth
};
