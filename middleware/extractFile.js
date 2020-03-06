const multer = require("multer");

const MIME_TYPES = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPES[file.mimetype];
    const error = isValid ? null : new Error("Invalid mime-type");
    cb(error, "uploads/");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLocaleLowerCase()
      .split(" ")
      .join("-");

    const ext = MIME_TYPES[file.mimetype];
    const fullName = `${name}-${Date.now()}.${ext}`;
    cb(null, fullName);
  }
});

module.exports = multer({ storage });
