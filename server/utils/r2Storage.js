
import {
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { randomUUID } from "node:crypto";
import {
  r2,
  R2_BUCKET_NAME,
  R2_PUBLIC_URL,
} from "../config/r2.js";

const allowedTypes = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

export const uploadToR2 = async (file, folder = "products") => {
  if (!file?.buffer) {
    throw new Error("File buffer is missing");
  }

  const extension = allowedTypes[file.mimetype];

  if (!extension) {
    throw new Error("Unsupported file type");
  }

  const allowedFolders = ["products", "hero"];
  if (!allowedFolders.includes(folder)) {
    throw new Error("Invalid upload folder");
  }

  const key = `${folder}/${randomUUID()}.${extension}`;

  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return {
    key,
    url: `${R2_PUBLIC_URL}/${key}`,
  };
};

export const getR2KeyFromUrl = (fileUrl) => {
  if (typeof fileUrl !== "string") return null;

  try {
    const publicUrl = new URL(R2_PUBLIC_URL);
    const url = new URL(fileUrl);

    if (url.origin !== publicUrl.origin) return null;

    const prefix = publicUrl.pathname.replace(/\/+$/, "");
    if (!url.pathname.startsWith(`${prefix}/`)) return null;

    const key = decodeURIComponent(
      url.pathname.slice(prefix.length + 1)
    );

    if (!/^(products|hero)\/[a-zA-Z0-9._/-]+$/.test(key)) {
      return null;
    }

    if (key.includes("..")) return null;

    return key;
  } catch {
    return null;
  }
};

export const deleteFromR2 = async (fileUrl) => {
  const key = getR2KeyFromUrl(fileUrl);
  if (!key) return false;

  await r2.send(
    new DeleteObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
    })
  );

  return true;
};
