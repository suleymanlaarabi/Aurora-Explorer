import { FunctionComponent } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { FaFileCirclePlus } from "react-icons/fa6";
import { RiFolderAddFill } from "react-icons/ri";

import CreateFileModal from "../common/Modal/CreateFileModal";
import useModal from "../../hooks/useModal";
import CreateDirectoryModal from "../common/Modal/CreateDirectoryModal";

import NavBarHeader from "./components/NavBarHeader";
import useKeyboardShortcut, { EventKEY } from "../../hooks/useKeyboardShortcut";

interface FileExplorerNavBarProps {}

interface MenuItem {
  label: string;
  shortcut: string;
  icon: JSX.Element;
  action: () => void;
}

interface Menu {
  label: string;
  items: MenuItem[];
}

const FileExplorerNavBar: FunctionComponent<FileExplorerNavBarProps> = () => {
  const { openModal, ModalWrapper } = useModal(CreateFileModal);

  const {
    openModal: openDirectoryModal,
    ModalWrapper: DirectoryModal,
  } = useModal(CreateDirectoryModal);

  const Menu: Menu[] = [
    {
      label: "File",
      items: [
        {
          label: "New File",
          shortcut: "Ctrl+Alt+N",
          icon: <FaFileCirclePlus />,
          action: () => openModal(),
        },
        {
          label: "New Folder",
          shortcut: "Ctrl+Shift+N",
          icon: <RiFolderAddFill />,
          action: () => openDirectoryModal(),
        },
      ],
    },
  ];

  useKeyboardShortcut(EventKEY.CTRL_ALT_N, () => {
    openModal();
  });

  useKeyboardShortcut(EventKEY.CTRL_SHIFT_N, () => {
    openDirectoryModal();
  });

  return (
    <>
      <ModalWrapper />
      <DirectoryModal />
      <Flex
        className="custom-navbar"
        px={3}
        pt={3}
        justifyContent={"space-between"}
      >
        {Menu.slice(0, 1).map((menu) => {
          return (
            <Flex className="no-drag" gap={3} key={menu.label} height={"full"}>
              {menu.items.map((item) => {
                return (
                  <IconButton
                    onClick={item.action}
                    key={item.label}
                    fontSize={25}
                    aria-label={item.label}
                    icon={item.icon}
                  />
                );
              })}
            </Flex>
          );
        })}

        <NavBarHeader name={"Aurora Explorer"} />
      </Flex>
    </>
  );
};

export default FileExplorerNavBar;
