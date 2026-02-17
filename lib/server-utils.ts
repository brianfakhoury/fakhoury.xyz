import "server-only";
import fs from "fs";
import path from "path";

/** Read an image file and return it as a base64 data URI for use in OG image generation */
export function getBase64Image(filePath: string): string {
  const imagePath = path.resolve(process.cwd(), filePath);
  const imageBuffer = fs.readFileSync(imagePath);

  const ext = path.extname(filePath).toLowerCase();
  const mimeType =
    ext === ".jpg" || ext === ".jpeg"
      ? "image/jpeg"
      : ext === ".png"
        ? "image/png"
        : ext === ".gif"
          ? "image/gif"
          : (() => { throw new Error(`Unsupported image format: ${ext}`); })();

  return `data:${mimeType};base64,${imageBuffer.toString("base64")}`;
}
