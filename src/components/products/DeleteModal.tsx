import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface Product {
  _id: string;
  title: string;
  price: number;
  image?: string;
  createdAt: string;
}
interface Prop {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: Product | null;
  handleDelete: () => void;
}

const DeleteModal = ({
  isOpen,
  onClose,
  selectedProduct,
  handleDelete,
}: Prop) => {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "whiteAlpha.300");
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" />

      <ModalContent bg={bg} borderColor={border} border="1px solid">
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
