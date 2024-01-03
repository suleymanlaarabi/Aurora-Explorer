import fs from "fs";
import { File } from "../../renderer/types/contextTypes";

export function readDirectory(path: string): File[] {
  const files = fs.readdirSync(path);
  return files.map((file) => {
    const stats = fs.statSync(`${path}/${file}`);
    return {
      name: file,
      is_dir: stats.isDirectory(),
      size: stats.size,
      path: `${path}/${file}`,
    };
  });
}

export function readFile(path: string): string {
  return fs.readFileSync(path, "utf8");
}
