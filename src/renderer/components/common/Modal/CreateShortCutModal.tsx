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
  Flex,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import IconDrawerSelector from "../Drawer/IconDrawerSelector";

type CreateShortCutModalProps = {
  onClose: () => void;
};

const CreateShortCutModal: React.FC<CreateShortCutModalProps> = ({
  onClose,
}) => {
  const [title, setTitle] = useState("");

  const handleSave = () => {
    onClose();
  };
  const [SelectedIcon, setSelectedIcon] = useState<JSX.Element | undefined>(
    undefined
  );

  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New ShortCut</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={"flex"} flexDirection={"column"} gap={4}>
          <Flex gap={4}>
            {/* text title input with selected icon */}
            <InputGroup>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {SelectedIcon && (
                <InputRightAddon>{SelectedIcon}</InputRightAddon>
              )}
            </InputGroup>

            <IconDrawerSelector
              onIconSelect={(icon) => setSelectedIcon(icon)}
            />
          </Flex>
          <Input placeholder="Path" />
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

export default CreateShortCutModal;
