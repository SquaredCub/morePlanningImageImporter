// Define the color mappings with RGB values
const colorMapping = {
  a: [128, 128, 128], // Gray
  b: [0, 0, 255], // Blue
  c: [0, 255, 0], // Green
  d: [255, 0, 0], // Red
  e: [255, 255, 0], // Yellow
  f: [255, 192, 203], // Pink
  g: [0, 255, 255], // Cyan
  h: [128, 0, 128], // Purple
  i: [255, 165, 0], // Orange
  j: [0, 0, 0], // Black
};

// Helper function to calculate Euclidean distance between two RGB colors
export const getColorDistance = (rgb1: number[], rgb2: number[]) => {
  return Math.sqrt(
    Math.pow(rgb1[0] - rgb2[0], 2) + // Red difference
      Math.pow(rgb1[1] - rgb2[1], 2) + // Green difference
      Math.pow(rgb1[2] - rgb2[2], 2) // Blue difference
  );
};

// Function to map RGB values to corresponding ASCII character based on color distance
export const mapColor = (r: number, g: number, b: number) => {
  // Check for pure white
  if (r >= 245 && g >= 245 && b >= 245) return "-";

  let closestColor = "a";
  let minDistance = Infinity;

  // Compare the pixel's RGB values to all the defined color mappings
  for (const [char, rgbValues] of Object.entries(colorMapping)) {
    const distance = getColorDistance([r, g, b], rgbValues);

    // Find the color with the minimum distance
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = char;
    }
  }
  return closestColor;
};

export const mapColor2 = (r: number, g: number, b: number) => {
  // Calculate the brightness using a weighted average for human perception
  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  // Define a set of characters in increasing brightness order
  const brightnessMapping = [
    "j",
    "i",
    "h",
    "g",
    "f",
    "e",
    "d",
    "c",
    "b",
    "a",
    "-",
  ];

  // Map the brightness to one of the defined characters
  const index = Math.floor((brightness / 255) * (brightnessMapping.length - 1));
  return brightnessMapping[index];
};

export const mapColor3 = (r: number, g: number, b: number) => {
  // Calculate the hue using the RGB to HSL conversion formula
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let hue = 0;

  if (max === min) hue = 0; // Grayscale case
  else if (max === r) hue = (60 * ((g - b) / (max - min)) + 360) % 360;
  else if (max === g) hue = 60 * ((b - r) / (max - min)) + 120;
  else hue = 60 * ((r - g) / (max - min)) + 240;

  // Define a set of characters to represent different hues
  const hueMapping = ["c", "g", "b", "h", "f", "d", "e", "i", "j", "a"];

  // Normalize hue to fit in the range of the defined characters
  const index = Math.floor((hue / 360) * hueMapping.length);
  return hueMapping[index];
};
