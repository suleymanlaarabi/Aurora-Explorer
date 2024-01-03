import { Flex, IconButton } from "@chakra-ui/react";
import { ipcRenderer } from "electron";
import { FaRegWindowMinimize } from "react-icons/fa";
import { TbWindowMinimize } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { GrExpand } from "react-icons/gr";
import { useState } from "react";

const WindowNavBar = () => {
  const [isMaximized, setIsMaximized] = useState(
    ipcRenderer.sendSync("is-window-maximized")
  );

  return (
    <Flex
      mt={"1px"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={3}
      px={3}
      className="custom-navbar"
    >
      <IconButton
        aria-label="Minimize"
        className="no-drag"
        size="sm"
        fontSize={"12px"}
        icon={<FaRegWindowMinimize />}
        onClick={() => ipcRenderer.send("minimize-window")}
      />
      <IconButton
        aria-label="toogle-window"
        className="no-drag"
        size="sm"
        fontSize={"18px"}
        icon={!isMaximized ? <GrExpand /> : <TbWindowMinimize />}
        onClick={() => {
          ipcRenderer.send("toogle-window");
          setIsMaximized(!isMaximized);
        }}
      />
      <IconButton
        aria-label="Minimize"
        className="no-drag"
        size="sm"
        fontSize={"18px"}
        icon={<IoMdClose />}
        onClick={() => ipcRenderer.send("close-window")}
      />
    </Flex>
  );
};

export default WindowNavBar;
