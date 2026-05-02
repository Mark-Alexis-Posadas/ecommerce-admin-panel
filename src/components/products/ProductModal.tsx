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
  FormControl,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";

type FormType = {
  title: string;
  price: string;
  stock: string;
  image: string;
};

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  onSubmit: (e: React.FormEvent) => void;
  mode: "create" | "edit";
}

const ProductModal = ({
  isOpen,
  onClose,
  form,
  setForm,
  onSubmit,
  mode,
}: Prop) => {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "whiteAlpha.300");

  const isEdit = mode === "edit";

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" />

      <ModalContent bg={bg} border="1px solid" borderColor={border}>
        <ModalHeader>{isEdit ? "Edit Product" : "Add Product"}</ModalHeader>

        <ModalBody>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Product Title</FormLabel>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Enter product title"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Price (₱)</FormLabel>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://..."
              />
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter gap={2}>
          <Button
            colorScheme={isEdit ? "yellow" : "purple"}
            flex={1}
            onClick={onSubmit}
          >
            {isEdit ? "Update" : "Create"}
          </Button>

          <Button variant="ghost" flex={1} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductModal;
