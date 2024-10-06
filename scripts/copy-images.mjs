import { promises as fs } from "fs";
import path from "path";

const CONTENT_IMAGES_PATH = path.join("content", "posts", "images");
const PUBLIC_PATH = path.join("public", "images");

async function copyImages() {
  try {
    // Ensure the source directory exists
    try {
      await fs.access(CONTENT_IMAGES_PATH);
    } catch {
      console.error(`Source directory does not exist: ${CONTENT_IMAGES_PATH}`);
      return;
    }

    // Read all entries (files and directories) in the source directory
    const entries = await fs.readdir(CONTENT_IMAGES_PATH);

    // Prepare and execute copy operations for all entries concurrently
    await Promise.all(
      entries.map(async (entry) => {
        const sourcePath = path.join(CONTENT_IMAGES_PATH, entry);
        const destinationPath = path.join(PUBLIC_PATH, entry);

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
