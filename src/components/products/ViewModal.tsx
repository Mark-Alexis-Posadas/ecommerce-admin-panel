import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Text,
  VStack,
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
}

const ViewModal = ({ isOpen, onClose, selectedProduct }: Prop) => {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "whiteAlpha.300");
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" />

      <ModalContent bg={bg} borderColor={border} border="1px solid">
        <ModalHeader>Product Details</ModalHeader>

        <ModalBody>
          <VStack spacing={3} align="start">
            {selectedProduct?.image && (
              <Image
                src={selectedProduct.image}
                w="100%"
                h="160px"
                objectFit="cover"
                borderRadius="lg"
              />
            )}

            <Text>
              <b>Title:</b> {selectedProduct?.title}
            </Text>

            <Text>
              <b>Price:</b> ₱{selectedProduct?.price}
            </Text>

            <Text>
              <b>Created:</b>{" "}
              {selectedProduct?.createdAt
                ? new Date(selectedProduct.createdAt).toLocaleDateString()
                : ""}
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button w="100%" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewModal;
