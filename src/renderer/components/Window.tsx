import LeftShortCut from "./layouts/LeftShortCut";
import { Flex } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppContextProvider from "../context/AppContextProvider";
import FileExplorer from "./views/FileExplorer";
import Edit from "./views/Edit";

const Window = () => {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Flex
          className="custom-navbar"
          w={"100%"}
          height={"100%"}
          direction={"row"}
        >
          <LeftShortCut />

          <Routes>
            <Route path="/" element={<FileExplorer />} />
            <Route path="/edit/:name" element={<Edit />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Flex>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default Window;
