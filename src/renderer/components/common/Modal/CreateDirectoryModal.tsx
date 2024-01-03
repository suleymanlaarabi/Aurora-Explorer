import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import appContext from "../../../context/createContext/appContext";

type CreateDirectoryModalProps = {
  onClose: () => void;
};

const CreateDirectoryModal: React.FC<CreateDirectoryModalProps> = ({
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const { path, addDirectory } = useContext(appContext);

  const handleSave = () => {
    addDirectory(`${path}/${title}`);
    onClose();
  };
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Directory</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateDirectoryModal;
