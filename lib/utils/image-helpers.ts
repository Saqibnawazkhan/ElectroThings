export function getImageUrl(path: string, size?: "sm" | "md" | "lg" | "xl"): string {
  if (!size) return path;

  const sizeMap = {
    sm: "w=200&h=200",
    md: "w=400&h=400",
    lg: "w=800&h=800",
    xl: "w=1200&h=1200",
  };

  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}${sizeMap[size]}&fit=crop`;
}

export function getPlaceholderImage(width: number = 400, height: number = 400): string {
  return `https://via.placeholder.com/${width}x${height}?text=Product+Image`;
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = src;
  });
}
