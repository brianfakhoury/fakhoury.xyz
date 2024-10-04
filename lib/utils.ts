import Vibrant from 'node-vibrant';
import path from 'path';

// Utility function to calculate brightness
export function getBrightness(hexColor: string): number {
  if (!hexColor || typeof hexColor !== 'string') return 0;
  const hex = hexColor.replace('#', '');
  if (hex.length !== 6) return 0;
  const [r, g, b] = [0, 2, 4].map((offset) =>
    parseInt(hex.substring(offset, offset + 2), 16)
  );
  return (r * 299 + g * 587 + b * 114) / 1000;
}

// Function to get cover color from the palette
export function getCoverColor(palette): string {
  const colors = Object.values(palette)
    .filter((swatch) => swatch && swatch.getHex)
    .map((swatch) => swatch.getHex());

  for (const color of colors) {
    const brightness = getBrightness(color);
    if (brightness > 180) {
      return color;
    }
  }
  return '#FFFFFF';
}

// Function to get cover color from image path
export async function getCoverColorFromImage(imagePath: string): Promise<string> {
  if (!imagePath) {
    return '#FFFFFF'; // default color
  }
  // Correct the image path for Vibrant
  const imagePathForVibrant = imagePath.startsWith('/')
    ? imagePath.slice(1)
    : imagePath;
  const vibrantImagePath = path.resolve('public', imagePathForVibrant);

  try {
    const palette = await Vibrant.from(vibrantImagePath).getPalette();
    if (!palette || Object.keys(palette).length === 0) {
      console.error('Palette is undefined or empty.');
      return '#FFFFFF';
    } else {
      return getCoverColor(palette);
    }
  } catch (error) {
    console.error('Error extracting color palette:', error);
    return '#FFFFFF'; // Fallback color
  }
}

// Utility function to format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function filterOutImages(markdown) {
  // regular expression to match image components in markdown
  const imageRegex = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g;
  // replace image components with an empty string
  const filteredMarkdown = markdown.replace(imageRegex, "").replace(/\n/g, "");

  return filteredMarkdown;
}
