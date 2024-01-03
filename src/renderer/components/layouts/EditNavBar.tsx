import { FunctionComponent } from "react";
import { Flex, IconButton, Tooltip } from "@chakra-ui/react";
import { FaFileCircleCheck } from "react-icons/fa6";
import { PiKeyReturnFill } from "react-icons/pi";
import { useNavigate, useParams } from "react-router-dom";
import NavBarHeader from "./components/NavBarHeader";
import useKeyboardShortcut, { EventKEY } from "../../hooks/useKeyboardShortcut";

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

interface EditNavBarProps {
  handleSave: () => void;
}

const EditNavBar: FunctionComponent<EditNavBarProps> = ({
  handleSave,
}: EditNavBarProps) => {
  const { name } = useParams() as { name: string };
  const navigate = useNavigate();

  const parsedName = name.length >= 25 ? `${name?.slice(0, 25)}...` : name;

  const Menu: Menu[] = [
    {
      label: "File",
      items: [
        {
          label: "Go Back",
          shortcut: "Esc",
          icon: <PiKeyReturnFill />,
          action: () => navigate("/"),
        },
        {
          label: "Save File",
          shortcut: "Ctrl+S",
          icon: <FaFileCircleCheck />,
          action: () => handleSave(),
        },
      ],
    },
  ];

  useKeyboardShortcut(EventKEY.CTRL_S, () => {
    handleSave();
  });

  useKeyboardShortcut(EventKEY.ESC, () => {
    navigate("/");
  });

  if (name === undefined) {
    navigate("/");
    return null;
  }
  return (
    <Flex className="custom-navbar" p={3} justifyContent={"space-between"}>
      {Menu.slice(0, 1).map((menu) => {
        return (
          <Flex gap={3} key={menu.label} height={"full"}>
            {menu.items.map((item) => {
              return (
                <Tooltip
                  label={`${item.label} (${item.shortcut})`}
                  key={item.label}
                >
                  <IconButton
                    fontSize={25}
                    className="no-drag"
                    onClick={item.action}
                    key={item.label}
                    aria-label={item.label}
                    icon={item.icon}
                  />
                </Tooltip>
              );
            })}
          </Flex>
        );
      })}
      <NavBarHeader name={parsedName} />
    </Flex>
  );
};

export default EditNavBar;
