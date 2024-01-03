import { memo, useContext, useRef, useState } from "react";
import {
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Input,
  Box,
  useOutsideClick,
  ChakraStyledOptions,
} from "@chakra-ui/react";
import { FaFolder, FaFile } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import appContext from "../../../context/createContext/appContext";
import { File } from "../../../types/contextTypes";
import isFileExt from "../../../services/data/ext";
import open from "open";
import useKeyboardShortcut, {
  EventKEY,
} from "../../../hooks/useKeyboardShortcut";

interface FileButtonProps {
  file: File;
  handlePropertyOpen: (file: File) => void;
}

const FileButton = memo(({ file, handlePropertyOpen }: FileButtonProps) => {
  const { name, path, is_dir, isClickable } = file;
  const navigate = useNavigate();
  const { setPath, removeFile, removeDirectory, updateFileName } = useContext(
    appContext
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isInRenameMode, setIsInRenameMode] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOutsideClick({ ref, handler: () => setIsInRenameMode(false) });

  const onRightClick = () => setIsOpen(true);

  useKeyboardShortcut(
    EventKEY.ENTER,
    () => {
      if (isInRenameMode) {
        const newName = inputRef.current?.value;
        if (newName) {
          updateFileName(file, newName);
        }
        setIsInRenameMode(false);
      }
    },
    isInRenameMode
  );

  const handleFileClick = () => {
    if (is_dir) {
      setPath(path);
      return;
    }
    if (isFileExt(name)) {
      open(path);
      return;
    }
    navigate(`/edit/${name}`);
  };

  const menuActions = [
    { name: "Rename", action: () => setIsInRenameMode(true) },
    {
      name: "Delete",
      action: () => (is_dir ? removeDirectory(file) : removeFile(file)),
    },
    { name: "Properties", action: () => handlePropertyOpen(file) },
  ];

  const buttonProps: ChakraStyledOptions = {
    colorScheme: "blue",
    height: isInRenameMode ? "95px" : "140px",
    width: "140px",
    fontSize: "14px",
  };

  const buttonNameComponent = (
    <Text mt={2} height={"30px"} whiteSpace="normal">
      {name}
    </Text>
  );

  if (!isClickable) {
    return (
      <Button isDisabled {...buttonProps}>
        <Icon as={is_dir ? FaFolder : FaFile} w="50%" h="50%" />
        {buttonNameComponent}
      </Button>
    );
  }

  return (
    <Box ref={ref} w="140px">
      <Menu isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MenuButton
          as={Button}
          {...buttonProps}
          onContextMenu={onRightClick}
          onClick={handleFileClick}
        >
          <Icon fontSize={"50px"} as={is_dir ? FaFolder : FaFile} />
          {!isInRenameMode && buttonNameComponent}
        </MenuButton>
        <MenuList>
          {menuActions.map(({ name: actionName, action }) => (
            <MenuItem key={actionName} onClick={action}>
              {actionName}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {isInRenameMode && (
        <Input
          ref={inputRef}
          autoFocus
          mt="5px"
          height="40px"
          w="100%"
          defaultValue={name}
        />
      )}
    </Box>
  );
});

export default FileButton;
