import { promises as fs } from "fs";
import path from "path";

const BLOG_CONTENT = path.join("content", "posts");
const PUBLIC_PATH = path.join("public");

async function copyImages() {
  try {
    // Ensure the source directory exists
    try {
      await fs.access(BLOG_CONTENT);
    } catch {
      console.error(`Source directory does not exist: ${BLOG_CONTENT}`);
      return;
    }

    // Read all entries (files and directories) in the source directory
    const entries = await fs.readdir(BLOG_CONTENT);

    // Prepare and execute copy operations for all entries concurrently
    await Promise.all(
      entries.map(async (entry) => {
        const sourcePath = path.join(BLOG_CONTENT, entry);
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
