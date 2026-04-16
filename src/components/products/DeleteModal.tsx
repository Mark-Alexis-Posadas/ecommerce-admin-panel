import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

const DeleteModal = ({ isOpen, onClose, selectedProduct, handleDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" />

      <ModalContent
        bg="#0f0f1a"
        border="1px solid"
        borderColor="whiteAlpha.200"
      >
        <ModalHeader color="red.400">Delete Product</ModalHeader>

        <ModalBody>
          <Text>
            Are you sure you want to delete <b>{selectedProduct?.title}</b>?
          </Text>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button colorScheme="red" flex={1} onClick={handleDelete}>
            Delete
          </Button>

          <Button variant="ghost" flex={1} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
