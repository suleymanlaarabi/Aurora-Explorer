const fileExt = [
  ".mp4",
  ".avi",
  ".mkv",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".ico",
  ".webp",
  ".svg",
];

function isFileExt(path: string): boolean {
  return fileExt.some((ext) => path.endsWith(ext));
}

export default isFileExt;
