import { promises as fs } from "fs";
import path from "path";

const BLOG_IMAGE_DIR = path.join("content", "posts", "images");
const PUBLIC_IMAGE_DIR = path.join("public", "images");

async function copyImages() {
  try {
    // Ensure the source directory exists
    try {
      await fs.access(BLOG_IMAGE_DIR);
    } catch {
      console.error(`Source directory does not exist: ${BLOG_IMAGE_DIR}`);
      return;
    }

    const entries = await fs.readdir(BLOG_IMAGE_DIR);

    await Promise.all(
      entries.map(async (entry) => {
        const sourcePath = path.join(BLOG_IMAGE_DIR, entry);
        const destinationPath = path.join(PUBLIC_IMAGE_DIR, entry);

        try {
          await fs.cp(sourcePath, destinationPath, { recursive: true });
          console.log(`Copied: ${entry}`);
        } catch (error) {
          console.error(`Failed to copy ${entry}:`, error.message);
        }
      })
    );

    console.log("All images have been copied successfully.");
  } catch (error) {
    console.error("Error copying images:", error.message);
  }
}

copyImages();
