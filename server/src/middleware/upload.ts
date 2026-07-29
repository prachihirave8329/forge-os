import multer from "multer";
import path from "path";
import fs from "fs";

// Create upload folders if they don't exist
const folders = [
  "uploads/images",
  "uploads/videos",
  "uploads/documents",
];

folders.forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const mime = file.mimetype;

    if (mime.startsWith("image/")) {
      cb(null, "uploads/images");
    } else if (mime.startsWith("video/")) {
      cb(null, "uploads/videos");
    } else {
      cb(null, "uploads/documents");
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

export default upload;