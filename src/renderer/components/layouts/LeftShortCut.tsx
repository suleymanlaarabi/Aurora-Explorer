import { Badge, Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import { useContext } from "react";
import appContext from "../../context/createContext/appContext";
import { TfiDesktop } from "react-icons/tfi";
import { FaRegTrashAlt } from "react-icons/fa";
import { TiHome } from "react-icons/ti";
import { getTrashSize } from "../../services/utils/fileManagement";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import CreateShortCutModal from "../common/Modal/CreateShortCutModal";
import useModal from "../../hooks/useModal";

const Menu = [
  {
    name: "Home",
    icon: <TiHome />,
    path: "/home/suleyman",
  },
  {
    name: "Desktop",
    icon: <TfiDesktop />,
    path: "/home/suleyman/Desktop",
  },
  {
    name: "Trash",
    icon: (
      <Flex>
        <FaRegTrashAlt
          style={{
            zIndex: 1,
            fontSize: "18px",
          }}
        />
        <Badge
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"50%"}
          position={"relative"}
          top={"-8px"}
          left={"-5px"}
          h={"20px"}
          w={"20px"}
          zIndex={0}
          colorScheme="blue"
        >
          {getTrashSize()}
        </Badge>
      </Flex>
    ),
    path: "/home/suleyman/.local/share/Trash/files",
  },
];

const LeftShortCut = () => {
  const { setPath } = useContext(appContext);
  const navigate = useNavigate();
  const {
    ModalWrapper: ShortCutModalWrapper,
    openModal: openShortCutModal,
  } = useModal(CreateShortCutModal);

  const handlePath = (newPath: string) => {
    setPath(newPath);
    navigate("/");
  };

  return (
    <>
      <ShortCutModalWrapper />
      <Flex
        className="no-drag"
        direction={"column"}
        gap={5}
        p={3}
        minWidth={"200px"}
        maxW={"200px"}
        height={"100%"}
        overflowY={"auto"}
        bg={"gray.100"}
        borderRadius={"10px"}
        fontSize={"20px"}
        justifyContent={"space-between"}
      >
        <Flex direction={"column"} gap={3}>
          {Menu.map((item) => (
            <Button
              gap={3}
              justifyContent={"flex-start"}
              alignItems={"center"}
              key={item.name}
              onClick={() => handlePath(item.path)}
              fontSize={"xl"}
            >
              <Box w={"40px"}>{item.icon}</Box>
              <Text fontSize={"14px"}>{item.name}</Text>
            </Button>
          ))}
        </Flex>
        <Flex w="100%">
          <Tooltip hasArrow label="Add new shortcut" aria-label="A tooltip">
            <Button
              w="100%"
              justifyContent={"center"}
              alignItems={"center"}
              fontSize={"30px"}
              onClick={openShortCutModal}
            >
              <IoMdAdd />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
};

export default LeftShortCut;
