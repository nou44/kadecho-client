import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,

  limits: {
    // Maximum size for EACH image
    fileSize: 10 * 1024 * 1024,

    // Maximum number of files in one request
    files: 101,
  },
});

export default upload;