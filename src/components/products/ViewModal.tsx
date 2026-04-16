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
} from "@chakra-ui/react";

const ViewModal = ({ isOpen, onClose, selectedProduct }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" />

      <ModalContent
        bg="#0f0f1a"
        border="1px solid"
        borderColor="whiteAlpha.200"
      >
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
