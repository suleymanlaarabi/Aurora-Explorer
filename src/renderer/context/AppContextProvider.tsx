import { PropsWithChildren, useEffect, useState } from "react";
import appContext from "./createContext/appContext";
import { File } from "../types/contextTypes";
import {
  createFile,
  createFolder,
  deleteFile,
  deleteFolder,
  getFiles,
  renameFile,
} from "../services/utils/fileManagement";
import { useToast } from "@chakra-ui/react";
import { getSuccessToast } from "../services/utils/toastManagement";
import allPath from "../services/data/osPath";

const AppContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const toast = useToast();
  const [path, setPath] = useState<string>(allPath.userPath);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("null");

  const fileExists = (filePath: string) =>
    files.some((f) => f.path === filePath);

  const addDirectory = async (directoryPath: string) => {
    await createFolder(directoryPath);
    toast(getSuccessToast("Directory created"));
    if (!fileExists(directoryPath)) {
      const newFile: File = {
        path: directoryPath,
        name: directoryPath.split("/").pop() || "",
        is_dir: true,
        size: 0,
        isClickable: true,
      };
      setFiles((prevFiles) => [...prevFiles, newFile]);
    }
  };

  const addFile = async (file: File, content: string) => {
    await createFile(file.path, content);
    toast(getSuccessToast("operation successful"));
    if (!fileExists(file.path)) {
      setFiles((prevFiles) => [...prevFiles, file]);
    }
  };

  const removeFile = async (file: File) => {
    await deleteFile(file.path);
    toast(getSuccessToast("File deleted"));
    setFiles((prevFiles) => prevFiles.filter((f) => f.path !== file.path));
  };

  const removeDirectory = async (directory: File) => {
    await deleteFolder(directory.path);
    toast(getSuccessToast("Directory deleted"));
    setFiles((prevFiles) => prevFiles.filter((f) => f.path !== directory.path));
  };

  const updateFileName = async (file: File, newName: string) => {
    const newPath = `${file.path.split("/").slice(0, -1).join("/")}/${newName}`;
    await renameFile(file.path, newPath);
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.path === file.path ? { ...f, name: newName, path: newPath } : f
      )
    );
  };

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      setError("");
      try {
        const data = await getFiles(path);
        setFiles(data);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    if (path) {
      fetchFiles();
    }
  }, [path]);

  const contextValue = {
    path,
    setPath,
    files,
    addFile,
    addDirectory,
    removeFile,
    removeDirectory,
    updateFileName,
    isLoading,
    error,
  };

  return (
    <appContext.Provider value={contextValue}>{children}</appContext.Provider>
  );
};

export default AppContextProvider;
