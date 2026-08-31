import multer from "multer";

const storage = multer.memoryStorage();

const heroVideoUpload = multer({
  storage,

  limits: {
    // Maximum size for ONE hero video
    fileSize: 50 * 1024 * 1024,

    // Only one video per request
    files: 1,
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed"));
    }
  },
});

export default heroVideoUpload;