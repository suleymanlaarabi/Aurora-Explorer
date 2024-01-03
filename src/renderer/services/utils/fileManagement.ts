import { PropertyFileProps } from "../../components/views/FileExplorer";
import { File } from "../../types/contextTypes";
import fs from "fs";
import allPath from "../data/osPath";

export async function getFiles(path: string): Promise<File[]> {
  const files: File[] = fs
    .readdirSync(path)
    .filter((file) => !file.startsWith("."))
    .map((file) => {
      try {
        const stats = fs.statSync(`${path}/${file}`);
        return {
          name: file,
          is_dir: stats.isDirectory(),
          size: stats.size,
          path: `${path}/${file}`,
          isClickable: true,
        };
      } catch (error) {
        return {
          name: file,
          is_dir: false,
          size: 0,
          path: `${path}/${file}`,
          isClickable: false,
        };
      }
    });
  return files;
}

export async function readFile(path: string): Promise<string> {
  return fs.readFileSync(path, "utf-8");
}

export async function createFile(
  path: string,
  content: string = ""
): Promise<void> {
  fs.writeFileSync(path, content);
}

export async function createFolder(path: string): Promise<void> {
  fs.mkdirSync(path);
}

export async function deleteFile(path: string): Promise<void> {
  fs.unlinkSync(path);
}

export async function deleteFolder(path: string): Promise<void> {
  fs.rm(path, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error(`Erreur lors de la suppression du dossier : ${err}`);
    } else {
      console.log("Dossier supprimé avec succès");
    }
  });
}

export async function renameFile(
  oldPath: string,
  newPath: string
): Promise<void> {
  fs.renameSync(oldPath, newPath);
}

export function getFullPropertyFile(file: File): PropertyFileProps {
  const res = fs.statSync(file.path);
  return {
    name: file.name,
    path: file.path,
    type: file.is_dir ? "folder" : "file",
    size: res.size,
    createdAt: res.birthtime.toDateString(),
    updatedAt: res.mtime.toDateString(),
  };
}

export function getTrashSize(): number {
  return fs.readdirSync(allPath.trashPath).length;
}
