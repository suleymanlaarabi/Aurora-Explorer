import parsePath from "path";

export function convertOctetToGBMBKB(octet: number): string {
  if (octet > 1000000000) {
    return `${(octet / 1000000000).toFixed(2)} GB`;
  }
  if (octet > 1000000) {
    return `${(octet / 1000000).toFixed(2)} MB`;
  }
  if (octet > 1000) {
    return `${(octet / 1000).toFixed(2)} KB`;
  }
  return `${octet} octet`;
}

export function convertPathToObjects(pathString: string) {
  let currentPath = "/";
  const segments = pathString.split("/").filter(Boolean);

  const pathObjects = segments.map((segment) => {
    currentPath = parsePath.join(currentPath, segment);
    return { name: segment, path: currentPath };
  });

  return [{ name: "/", path: "/" }, ...pathObjects];
}
