import { useState, useMemo } from "react";
import axios from "axios";
import { Package, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import {
  Box,
  Flex,
  Heading,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  IconButton,
  Spinner,
  Center,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import toast from "react-hot-toast";
import Pagination from "../components/ui/Pagination";
import ViewModal from "../components/products/ViewModal";
import EditModal from "../components/products/EditModal";
import DeleteModal from "../components/products/DeleteModal";
import useProducts from "../hooks/useProducts";
interface Product {
  _id: string;
  title: string;
  price: number;
  image?: string;
  createdAt: string;
}

interface FormType {
  title: string;
  price: string;
  image: string;
}

const Products = () => {
  const { products, setProducts, loading, error, page, setPage, meta } =
    useProducts();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeModal, setActiveModal] = useState<
    "view" | "edit" | "delete" | null
  >(null);
  const [form, setForm] = useState<FormType>({
    title: "",
    price: "",
    image: "",
  });

  // CREATE PRODUCT
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.price) {
      return toast.error("Title & price required");
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/products", {
        title: form.title,
        price: Number(form.price),
        image: form.image,
      });

      setProducts((prev) => [data, ...prev]);
      setShowModal(false);

      setForm({ title: "", price: "", image: "" });

      toast.success("Product added 🚀");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleEdit = (product: Product) => {
    setActiveModal("edit");
    setSelectedProduct(product);
    setForm({
      title: product.title,
      price: String(product.price),
      image: product.image || "",
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProduct) return;

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/products/${selectedProduct._id}`,
        {
          title: form.title,
          price: Number(form.price),
          image: form.image,
        },
      );

      setProducts((prev) => prev.map((p) => (p._id === data._id ? data : p)));

      toast.success("Product updated ✏️");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleView = (product: Product) => {
    setSelectedProduct(product);
    setActiveModal("view");
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);

    setActiveModal("delete");
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${selectedProduct._id}`,
      );

      setProducts((prev) => prev.filter((p) => p._id !== selectedProduct._id));

      toast.success("Product deleted 🗑️");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedProduct(null);
  };

  const bg = useColorModeValue("white", "gray.800");
  const tableHead = useColorModeValue("gray.100", "gray.700");
  const rowHoverBg = useColorModeValue("gray.50", "gray.700");

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500" fontSize="lg" textAlign="center">
          {error}
        </Text>
      </Center>
    );
  }
  return (
    <Box>
      {/* HEADER */}
      <Flex align="center" justify="space-between" mb={6}>
        <Flex align="center" gap={3}>
          <Package />
          <Heading size="md">Products</Heading>
        </Flex>

        <Button
          onClick={() => setShowModal(true)}
          colorScheme="purple"
          leftIcon={<Plus size={16} />}
        >
          Add Product
        </Button>
      </Flex>

      {/* TABLE */}
      <Box
        bg={bg}
        borderRadius="xl"
        borderWidth="1px"
        overflow="hidden"
        shadow="sm"
      >
        <Table>
          <Thead bg={tableHead}>
            <Tr>
              <Th>Product</Th>
              <Th>Price</Th>
              <Th>Created</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {products.map((p) => (
              <Tr key={p._id} _hover={{ bg: rowHoverBg }}>
                {/* PRODUCT */}
                <Td>
                  <Flex align="center" gap={3}>
                    {p.image && (
                      <Image
                        src={p.image}
                        boxSize="40px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    )}
                    {p.title}
                  </Flex>
                </Td>

                {/* PRICE */}
                <Td color="purple.500" fontWeight="semibold">
                  ₱{Number(p.price || 0).toLocaleString()}
                </Td>

                {/* CREATED */}
                <Td>{new Date(p.createdAt).toLocaleDateString()}</Td>

                {/* ACTIONS */}
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      aria-label="view"
                      icon={<Eye size={16} />}
                      onClick={() => handleView(p)}
                    />

                    <IconButton
                      aria-label="edit"
                      icon={<Pencil size={16} />}
                      colorScheme="yellow"
                      onClick={() => handleEdit(p)}
                    />

                    <IconButton
                      aria-label="delete"
                      icon={<Trash2 size={16} />}
                      colorScheme="red"
                      onClick={() => handleDeleteClick(p)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* PAGINATION */}
        <Box p={4}>
          <Pagination
            currentPage={meta?.page || 1}
            totalPages={meta?.totalPages || 1}
            onPageChange={(p) => setPage(p)}
          />
        </Box>
      </Box>

      {/* MODAL (UNCHANGED LOGIC, Chakra style lang) */}
      {showModal && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box bg={bg} p={6} borderRadius="xl" w="full" maxW="md">
            <Heading size="md" mb={4}>
              Add Product
            </Heading>

            <form onSubmit={handleCreate}>
              <Flex direction="column" gap={3}>
                <input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />

                <input
                  placeholder="Price"
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <input
                  placeholder="Image URL"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />

                <Flex gap={2} mt={2}>
                  <Button type="submit" colorScheme="purple" flex={1}>
                    Create
                  </Button>

                  <Button
                    onClick={() => setShowModal(false)}
                    flex={1}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Box>
        </Box>
      )}

      {/* KEEP YOUR MODALS */}

      <ViewModal
        isOpen={activeModal === "view"}
        onClose={closeModal}
        selectedProduct={selectedProduct}
      />

      <EditModal
        isOpen={activeModal === "edit"}
        onClose={closeModal}
        handleUpdate={handleUpdate}
        form={form}
        setForm={setForm}
      />

      <DeleteModal
        isOpen={activeModal === "delete"}
        onClose={closeModal}
        handleDelete={handleDelete}
        selectedProduct={selectedProduct}
      />
    </Box>
  );
};

export default Products;
