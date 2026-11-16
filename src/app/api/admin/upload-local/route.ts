import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { adminOk, blobEnabled } from "../../../../lib/guard";

export const runtime = "nodejs";

const EXT = /\.(jpe?g|png|webp|gif|avif|mp4|webm|mov|m4v)$/i;
const MAX = 100 * 1024 * 1024;

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
      if (text.startsWith("http")) return text;
    }
  } catch (e) {
    console.warn("Free CDN upload failed:", e);
  }
  return null;
}

/** Handles direct file uploads using @vercel/blob with fallback to permanent free cloud CDN & public/uploads */
export async function POST(req: Request) {
  if (!(await adminOk())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file provided" }, { status: 400 });
  if (!EXT.test(file.name) || (!file.type.startsWith("image/") && !file.type.startsWith("video/"))) {
    return NextResponse.json({ error: "Only images and videos are allowed." }, { status: 400 });
  }
  if (file.size > MAX) return NextResponse.json({ error: "File exceeds 100MB limit." }, { status: 413 });

  const safe = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-80);
  const name = `${Date.now()}-${safe}`;

  // 1. If Vercel Blob token is configured, try saving to Vercel Blob
  if (blobEnabled()) {
    try {
      const blob = await put(`articles/${name}`, file, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN || undefined,
      });
      if (blob && blob.url) {
        return NextResponse.json({ url: blob.url });
      }
    } catch (err) {
      console.warn("Vercel Blob put failed (suspended or token issue):", err);
    }
  }

  // 2. Free Cloud CDN Fallback (Always active, never suspends)
  const cdnUrl = await uploadToFreeCdn(file);
  if (cdnUrl) {
    return NextResponse.json({ url: cdnUrl });
  }

  // 3. Local filesystem fallback
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const dir = path.join(process.cwd(), "public", "images", "articles");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
    return NextResponse.json({ url: `/images/articles/${name}` });
  } catch {
    return NextResponse.json({ error: "Upload failed. Please enter an image URL directly." }, { status: 500 });
  }
}
