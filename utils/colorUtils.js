export function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function getBrightness(hexColor) {
  let rgbColor = hexToRgb(hexColor);
  if (rgbColor) {
    return Math.sqrt(
      0.299 * (rgbColor.r * rgbColor.r) +
        0.587 * (rgbColor.g * rgbColor.g) +
        0.114 * (rgbColor.b * rgbColor.b)
    );
  } else {
    console.error("Invalid color input");
    return null;
  }
}
