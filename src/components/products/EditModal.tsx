import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  VStack,
} from "@chakra-ui/react";

const EditModal = ({ isOpen, onClose, form, setForm, handleUpdate }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" />

      <ModalContent
        bg="#0f0f1a"
        border="1px solid"
        borderColor="whiteAlpha.200"
      >
        <ModalHeader>Edit Product</ModalHeader>

        <ModalBody>
          <VStack spacing={4}>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
            />

            <Input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Price"
            />

            <Input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="Image URL"
            />
          </VStack>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button colorScheme="yellow" flex={1} onClick={handleUpdate}>
            Update
          </Button>

          <Button variant="ghost" flex={1} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
