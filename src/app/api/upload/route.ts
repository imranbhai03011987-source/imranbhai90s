import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";

const EXT = /\.(jpe?g|png|webp|gif|avif|mp4|webm|mov|m4v)$/i;
const MAX = 100 * 1024 * 1024; // 100MB

/**
 * Uploads a file buffer to free permanent cloud CDN (Catbox).
 * Requires zero API keys, never suspends, and provides permanent fast CDN delivery.
 */
async function uploadToFreeCdn(file: File): Promise<string | null> {
  try {
    const boundary = `----WebKitFormBoundary${Math.random().toString(36).substring(2)}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const header = Buffer.from(
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="reqtype"\r\n\r\n` +
      `fileupload\r\n` +
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="fileToUpload"; filename="${file.name.replace(/[^a-zA-Z0-9._-]+/g, "-")}"\r\n` +
      `Content-Type: ${file.type || "application/octet-stream"}\r\n\r\n`
    );
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
    const payload = Buffer.concat([header, buffer, footer]);

    const res = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
        "User-Agent": "90sTVMemories/1.0",
      },
      body: payload,
    });

    if (res.ok) {
      const text = (await res.text()).trim();
      if (text.startsWith("http")) {
        return text;
      }
    }
  } catch (e) {
    console.warn("Free CDN upload failed, falling back to local:", e);
  }
  return null;
}

/**
 * Robust Multi-Tier Upload Route:
 * Tier 1: Vercel Blob (if active & not suspended)
 * Tier 2: Free Permanent Cloud CDN (never suspends, free forever)
 * Tier 3: Local public directory fallback (/public/images/articles/)
 */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!EXT.test(file.name) || (!file.type.startsWith("image/") && !file.type.startsWith("video/"))) {
      return NextResponse.json({ error: "Only images and videos are allowed." }, { status: 400 });
    }

    if (file.size > MAX) {
      return NextResponse.json({ error: "File exceeds 100MB limit." }, { status: 413 });
    }

    const safe = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-80);
    const fileName = `${Date.now()}-${safe}`;

    // Tier 1: Try Vercel Blob if token is available
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`articles/${fileName}`, file, {
          access: "public",
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        if (blob && blob.url) {
          return NextResponse.json({ url: blob.url, provider: "vercel-blob" });
        }
      } catch (blobErr: any) {
        console.warn("Vercel Blob failed or suspended:", blobErr?.message || blobErr);
      }
    }

    // Tier 2: Free Permanent Cloud CDN (Instant, reliable, never suspends)
    const cdnUrl = await uploadToFreeCdn(file);
    if (cdnUrl) {
      return NextResponse.json({ url: cdnUrl, provider: "free-cloud-cdn" });
    }

    // Tier 3: Local storage fallback
    try {
      const fs = await import("node:fs/promises");
      const path = await import("node:path");
      const dir = path.join(process.cwd(), "public", "images", "articles");
      await fs.mkdir(dir, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(dir, fileName), buffer);
      return NextResponse.json({ url: `/images/articles/${fileName}`, provider: "local-fs" });
    } catch (fsErr) {
      console.warn("Local storage fallback failed:", fsErr);
    }

    return NextResponse.json({ error: "Upload temporarily unavailable. Please paste an image URL directly." }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Upload error" }, { status: 500 });
  }
}
