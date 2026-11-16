
import multer from "multer";

const allowedTypes = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

const heroVideoUpload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 50 * 1024 * 1024,
    files: 1,
  },

  fileFilter: (req, file, cb) => {
    if (!allowedTypes.has(file.mimetype)) {
      return cb(
        new Error("Only MP4, WebM and MOV videos are allowed")
      );
    }

    cb(null, true);
  },
});

export default heroVideoUpload;
