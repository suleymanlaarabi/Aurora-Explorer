import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { File } from "../../../types/contextTypes";
import { getFullPropertyFile } from "../../../services/utils/fileManagement";
import { convertOctetToGBMBKB } from "../../../services/utils/converter";

interface FileModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: File;
}

const FileModal = ({ isOpen, onClose, file }: FileModalProps) => {
  const { name, path, size, type, createdAt, updatedAt } = file.name
    ? getFullPropertyFile(file)
    : {
        name: "",
        path: "",
        size: 0,
        type: "",
        createdAt: "",
        updatedAt: "",
      };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{file.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Name: {name}</p>
          <p>Path: {path}</p>
          <p>Size: {convertOctetToGBMBKB(size)}</p>
          <p>Type: {type}</p>
          <p>Created At: {createdAt}</p>
          <p>Updated At: {updatedAt}</p>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FileModal;
