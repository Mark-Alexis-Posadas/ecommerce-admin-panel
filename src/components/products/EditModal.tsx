import {
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  VStack,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";

type FormType = {
  title: string;
  price: string;
  stock: string;
  image: string;
  category: string; // 🔥 added
};

type Category = {
  _id: string;
  name: string;
};

interface Prop {
  isOpen: boolean;
  onClose: () => void;
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
  categories: Category[]; // 🔥 added
}

const EditModal = ({
  isOpen,
  onClose,
  form,
  setForm,
  handleUpdate,
  categories,
}: Prop) => {
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.200", "whiteAlpha.300");

  console.log(categories);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.600" />

      <ModalContent bg={bg} border="1px solid" borderColor={border}>
        <ModalHeader>Edit Product</ModalHeader>

        <ModalBody>
          <VStack spacing={4}>
            {/* TITLE */}
            <FormControl>
              <FormLabel>Product Title</FormLabel>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </FormControl>

            {/* PRICE */}
            <FormControl>
              <FormLabel>Price (₱)</FormLabel>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </FormControl>

            {/* STOCK */}
            <FormControl>
              <FormLabel>Stock</FormLabel>
              <Input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
            </FormControl>

            {/* IMAGE */}
            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </FormControl>

            {/* 🔥 CATEGORY DROPDOWN */}
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                value={form.category}
                placeholder="Select category"
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            </FormControl>
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
