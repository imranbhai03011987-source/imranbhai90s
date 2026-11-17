import crypto from "node:crypto";

export const isCloudinaryConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      ((process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) ||
        process.env.CLOUDINARY_UPLOAD_PRESET)
  );

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder = "90stvmemories/articles",
  filename?: string
): Promise<string> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) throw new Error("Cloudinary cloud name is missing.");

  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const publicId = filename ? filename.replace(/\.[^/.]+$/, "") : `art_${Date.now()}`;

  const formData = new FormData();
  const blob = new Blob([fileBuffer]);
  formData.append("file", blob, filename || "upload.webp");
  formData.append("folder", folder);

  if (uploadPreset) {
    formData.append("upload_preset", uploadPreset);
  } else if (apiKey && apiSecret) {
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("public_id", publicId);

    const paramsToSign = `folder=${folder}&public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash("sha1").update(paramsToSign).digest("hex");
    formData.append("signature", signature);
  } else {
    throw new Error("Cloudinary credentials incomplete.");
  }

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = (await res.json().catch(() => ({}))) as { secure_url?: string; error?: { message?: string } };
  if (!res.ok || !data.secure_url) {
    throw new Error(data.error?.message || "Cloudinary upload failed.");
  }

  return data.secure_url;
}
