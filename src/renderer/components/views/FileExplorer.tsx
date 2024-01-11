import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";

import appContext from "../../context/createContext/appContext";
import { useCallback, useContext, useState } from "react";
import FileButton from "../common/Button/FileButton";
import FileModal from "../layouts/components/FileModal";
import { File } from "../../types/contextTypes";
import { convertPathToObjects } from "../../services/utils/converter";
import undefinedFile from "../../services/data/file";
import FileExplorerNavBar from "../layouts/FileExplorerNavBar";

export interface PropertyFileProps {
  name: string;
  path: string;
  size: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

const FileExplorer = () => {
  const { path, setPath, files, isLoading, error } = useContext(appContext);

  const pathItems = convertPathToObjects(path);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedFile, setSelectedFile] = useState<File>(undefinedFile);

  const handlePropertyFileOpen = useCallback(
    (file: File) => {
      setSelectedFile(file);
      onOpen();
    },
    [onOpen]
  );

  const handlePath = (newPath: string) => setPath(newPath);

  const FilesRenderer = useCallback(() => {
    return (
      <Flex wrap={"wrap"} gap={3}>
        {files.map((file) => {
          return (
            <FileButton
              key={file.path}
              file={file}
              handlePropertyOpen={handlePropertyFileOpen}
            />
          );
        })}
      </Flex>
    );
  }, [files, handlePropertyFileOpen]);

  return (
    <Flex className="no-drag" w={"100%"} direction={"column"}>
      <FileExplorerNavBar />

      <FileModal isOpen={isOpen} onClose={onClose} file={selectedFile} />
      <Breadcrumb
        maxW={"100%"}
        minH={"50px"}
        overflowY={"hidden"}
        overflowX={"auto"}
        p={4}
        pb={0}
        separator={<FaChevronRight />}
      >
        {pathItems.map((item) => (
          <BreadcrumbItem key={item.path}>
            <BreadcrumbLink onClick={() => handlePath(item.path)}>
              {item.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </Breadcrumb>
      <Flex
        overflowX={"hidden"}
        overflowY="auto"
        p={4}
        gap={5}
        flexDirection="column"
      >
        {isLoading ? (
          <Flex height={"50vh"} alignItems={"center"} justifyContent="center">
            <Spinner />
          </Flex>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <FilesRenderer />
        )}
      </Flex>
    </Flex>
  );
};

export default FileExplorer;
