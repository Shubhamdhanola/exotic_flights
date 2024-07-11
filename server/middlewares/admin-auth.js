const HttpError = require("../models/http-error");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      const error = new HttpError("Authentication Failed!", 400);
      return next(error);
    }

    decodedToken = jwt.verify(token, "secret");

    if (decodedToken) {
      const admin = await Admin.findOne({ token: token });

      if (admin.email !== decodedToken.email) {
        const error = new HttpError("Authentication Failed!", 400);
        return next(error);
      }
    } else {
      const error = new HttpError("Authentication Failed!", 400);
      return next(error);
    }

    req.adminData = decodedToken;
    next();
  } catch (err) {
    const error = new HttpError("Authentication Failed!", 400);
    return next(error);
  }
};

module.exports = authToken;
