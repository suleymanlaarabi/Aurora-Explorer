import React, { useState, useCallback } from "react";

type ModalProps = {
  onClose: () => void;
};

function useModal<T extends ModalProps>(
  ModalComponent: React.ComponentType<T>,
  props?: T
) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const ModalWrapper: React.FC = () =>
    isOpen ? (
      <ModalComponent {...props} {...({ onClose: closeModal } as T)} />
    ) : null;

  return { openModal, ModalWrapper };
}

export default useModal;
