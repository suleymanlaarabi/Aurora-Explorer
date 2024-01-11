import { PropertyFileProps } from "../../components/views/FileExplorer";
import { File } from "../../types/contextTypes";
import fs from "fs";
import allPath from "../data/osPath";
import path from "path";

export async function getFiles(directoryPath: string) {
  const files = await fs.promises.readdir(directoryPath);
  return Promise.all(
    files
      .filter((file) => !file.startsWith("."))
      .map(async (file) => {
        const filePath = path.join(directoryPath, file);
        try {
          const stats = await fs.promises.stat(filePath);
          return {
            name: file,
            is_dir: stats.isDirectory(),
            size: stats.size,
            path: filePath,
            isClickable: true,
          };
        } catch (error) {
          return {
            name: file,
            is_dir: false,
            size: 0,
            path: filePath,
            isClickable: false,
          };
        }
      })
  );
}

export async function readFile(filePath: string): Promise<string> {
  return fs.readFileSync(filePath, "utf-8");
}

export async function createFile(
  filePath: string,
  content: string = ""
): Promise<void> {
  fs.writeFileSync(filePath, content);
}

export async function createFolder(filePath: string): Promise<void> {
  fs.mkdirSync(filePath);
}

export async function deleteFile(filePath: string): Promise<void> {
  fs.unlinkSync(filePath);
}

export async function deleteFolder(filePath: string): Promise<void> {
  fs.rm(filePath, { recursive: true, force: true }, (err) => {
    if (err) {
      console.error(`Erreur lors de la suppression du dossier : ${err}`);
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
