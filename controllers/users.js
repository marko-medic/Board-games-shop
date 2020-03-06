const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const emailManager = require("../shared/emailManager");
const { PW_MIN_LEN } = require("../shared/constants");
const { cryptPassword, validatePassword } = require("../shared/cryptManager");

const _findUser = async email => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (err) {
    throw new Error(err);
  }
};

const register = async (req, res, next) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) throw new Error("ALREADY_REGISTERED");

    if (req.body.password.length < PW_MIN_LEN) {
      throw new Error(
        "Password must be at least " + PW_MIN_LEN + " characters long!"
      );
    }

    if (req.body.password !== req.body.password_repeat) {
      throw new Error("Password and repeated password don't match");
    }

    user = await UserModel.create(req.body);
    user.password = await cryptPassword(req.body.password);
    await user.save();
    user.password = null;

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "2 days" // expires in 24 hours
      }
    );

    return res.status(201).json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
  }
};

const login = async (req, res, next) => {
  try {
    const user = await _findUser(req.body.email);
    const isPasswordValid = await validatePassword(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "2 days" // expires in 24 hours
      }
    );

    user.password = null;
    return res.status(200).json({
      success: true,
      data: {
        token,
        user
      }
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      error: err.message
    });
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await _findUser(req.body.email);
    let user = await UserModel.findOneAndUpdate({ _id: userId }, req.body, {
      new: true
    });

    user.password = await cryptPassword(req.body.password);
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.SECRET_TOKEN,
      {
        expiresIn: "2 days" // expires in 24 hours
      }
    );

    user.password = null;

    return res.status(200).json({
      success: true,
      data: {
        token,
        user
      }
    });
  } catch (err) {
    return res.status(404).json({
      success: false,
      error: err.message
    });
  }
};

const sendEmail = (req, res, next) => {
  try {
    emailManager.main(req.body);
    res.json({
      success: true,
      message: "Email has been sent"
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

module.exports = {
  register,
  update,
  login,
  sendEmail
};
