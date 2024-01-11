import { createContext } from "react";
import { File } from "../../types/contextTypes";

interface AppContextType {
  path: string;
  files: File[];
  addFile: (file: File, content: string) => void;
  setPath: (path: string) => void;
  addDirectory: (path: string) => void;
  removeFile: (file: File) => void;
  removeDirectory: (file: File) => void;
  updateFileName: (file: File, name: string) => void;
  isLoading: boolean;
  error: string;
}

const appContext = createContext<AppContextType>({
  path: "",
  files: [],
  addFile: () => {},
  setPath: () => {},
  addDirectory: () => {},
  removeFile: () => {},
  removeDirectory: () => {},
  updateFileName: () => {},
  isLoading: false,
  error: "",
});

export default appContext;
