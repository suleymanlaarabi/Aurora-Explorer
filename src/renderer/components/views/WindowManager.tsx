import {
  FunctionComponent,
  //  useEffect,
  useRef,
  useState,
} from "react";
import {
  ChakraProvider,
  ChakraStyledOptions,
  Flex,
  IconButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  extendTheme,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Window from "../Window";
import WindowNavBar from "../layouts/WindowNavBar";

//  import html2canvas from "html2canvas";

const theme: ChakraStyledOptions = extendTheme({
  styles: {
    global: {
      "html, body": {
        height: "100%",
        margin: 0,
        padding: 0,
        borderRadius: "10px",
        overflow: "hidden",
        backgroundColor: "transparent",
      },
    },
  },
});

interface WindowManagerProps {}

const WindowManager: FunctionComponent<WindowManagerProps> = () => {
  const [windows, setWindows] = useState([1]);
  const ref = useRef(null);

  // useEffect(() => {
  //   // on click space bar
  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     console.log(e.code);
  //     if (e.code === "Space") {
  //       // get last window id
  //       html2canvas(ref.current, {
  //         foreignObjectRendering: true,
  //       }).then((canvas) => {
  //         const link = document.createElement("a");
  //         link.download = "image.png";
  //         link.href = canvas.toDataURL();
  //         link.click();
  //       });
  //     }
  //   };

  //   window.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <ChakraProvider theme={theme}>
      <Tabs
        ref={ref}
        className="custom-navbar"
        backgroundColor="white"
        height="100vh"
      >
        <TabList className="custom-navbar" height={"50px"}>
          <Flex
            mt={"1px"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            px={3}
            className="custom-navbar"
          >
            <IconButton
              size="sm"
              fontSize={"12px"}
              className="no-drag"
              aria-label="Add Window"
              icon={<FaPlus />}
              onClick={() => {
                // get last window id
                const lastWindow = windows[windows.length - 1];

                if (lastWindow) {
                  setWindows([...windows, lastWindow + 1]);
                } else {
                  setWindows([1]);
                }
              }}
            />
          </Flex>
          {windows.map((window) => (
            <Tab
              justifyContent={"space-between"}
              w={"100%"}
              className="no-drag"
              key={window}
            >
              {window}
              {windows.length > 1 && (
                <IconButton
                  size="sm"
                  fontSize={"12px"}
                  className="no-drag"
                  aria-label="Add Window"
                  icon={<IoMdClose />}
                  onClick={() => {
                    setWindows(windows.filter((w) => w !== window));
                  }}
                />
              )}
            </Tab>
          ))}

          <WindowNavBar />
        </TabList>
        <TabPanels className="custom-navbar" height={"calc(100vh - 50px)"}>
          {windows.map((window) => (
            <TabPanel key={window} height={"100%"}>
              <Window />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
};
export default WindowManager;
