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

type CreateFileModalProps = {
  onClose: () => void;
};

const CreateFileModal: React.FC<CreateFileModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const { path, addFile } = useContext(appContext);

  const handleSave = () => {
    addFile(
      {
        name: title,
        path: `${path}/${title}`,
        is_dir: false,
        size: 0,
        isClickable: true,
      },
      ""
    );
    onClose();
  };
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create File</ModalHeader>
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

export default CreateFileModal;
