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
  useColorModeValue,
} from "@chakra-ui/react";

type FormType = {
  title: string;
  price: string;
  image: string;
};

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  form: FormType;
  handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
}

const EditModal = ({ isOpen, onClose, form, setForm, handleUpdate }: Prop) => {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "whiteAlpha.300");
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" />

      <ModalContent bg={bg} border="1px solid" borderColor={border}>
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
