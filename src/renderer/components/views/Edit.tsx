import React, { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import appContext from "../../context/createContext/appContext";
import EditNavBar from "../layouts/EditNavBar";
import { Flex, Textarea } from "@chakra-ui/react";
import { readFile } from "../../services/utils/fileManagement";

function Edit() {
  const { name } = useParams();
  const { path, addFile } = useContext(appContext);
  const textareaRef = useRef<HTMLTextAreaElement>(
    null
  ) as React.MutableRefObject<HTMLTextAreaElement>;
  const fullPath = `${path}/${name}`;
  useEffect(() => {
    readFile(fullPath).then((data) => {
      textareaRef.current.value = data;
    });
  }, [name, fullPath]);
  const handleSave = () => {
    addFile(
      { name: name as string, path: fullPath, is_dir: false, size: 0 },
      textareaRef.current.value
    );
  };

  return (
    <Flex direction={"column"} h={"100%"} w={"100%"}>
      <EditNavBar handleSave={handleSave} />
      <Flex className="no-drag" mx={3} mb={3} h={"full"}>
        <Textarea ref={textareaRef} height={"100%"} width={"100%"} />
      </Flex>
    </Flex>
  );
}

export default Edit;
