import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const isCloudinaryConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder = "90stvmemories/articles",
  filename?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: filename ? filename.replace(/\.[^/.]+$/, "") : undefined,
        resource_type: "auto",
        overwrite: true,
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error || new Error("Cloudinary upload failed."));
        } else {
          resolve(result.secure_url);
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
}

export default cloudinary;
