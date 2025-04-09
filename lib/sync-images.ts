import { promises as fs } from "fs";
import path from "path";
import { existsSync } from "fs";

/** Source directory containing blog post images */
const BLOG_IMAGE_DIR = path.join("content", "posts", "images");

/** Destination directory for publicly accessible images */
const PUBLIC_IMAGE_DIR = path.join("public", "images");

/**
 * Synchronizes images from the /content/posts/images directory to the /public/images directory
 * 
 * - Only copies files that don't exist in the destination
 * - Only updates files that have been modified (based on modification time)
 * 
 * @returns {Promise<void>}
 */
export async function syncImages(): Promise<void> {
  if (!existsSync(BLOG_IMAGE_DIR)) {
    console.log(`Source directory not found: ${BLOG_IMAGE_DIR}`);
    return;
  }
  
  // Ensure destination exists
  if (!existsSync(PUBLIC_IMAGE_DIR)) {
    await fs.mkdir(PUBLIC_IMAGE_DIR, { recursive: true });
  }
  
  await syncDirectory(BLOG_IMAGE_DIR, PUBLIC_IMAGE_DIR);
}

/**
 * Recursively synchronizes a directory and its contents
 * 
 * @param sourceDir Source directory path
 * @param destDir Destination directory path
 */
async function syncDirectory(sourceDir: string, destDir: string): Promise<void> {
  const entries = await fs.readdir(sourceDir);
  
  // Create destination directory if it doesn't exist
  if (!existsSync(destDir)) {
    await fs.mkdir(destDir, { recursive: true });
  }
  
  await Promise.all(entries.map(async (entry) => {
    const sourcePath = path.join(sourceDir, entry);
    const destPath = path.join(destDir, entry);
    
    const stats = await fs.stat(sourcePath);
    
    if (stats.isDirectory()) {
      // Recursively sync subdirectories
      await syncDirectory(sourcePath, destPath);
    } else if (stats.isFile()) {
      // For files, check if they need copying
      const needsCopy = !existsSync(destPath) || 
        stats.mtimeMs > (await fs.stat(destPath).catch(() => ({ mtimeMs: 0 }))).mtimeMs;
      
      if (needsCopy) {
        await fs.copyFile(sourcePath, destPath);
      }
    }
  }));
} 