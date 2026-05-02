import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Package, Plus, Eye, Pencil, Trash2 } from "lucide-react";
import {
  Input,
  Select,
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
import AddModal from "../components/products/AddModal";
interface Product {
  _id: string;
  title: string;
  price: number;
  stock: number;
  image?: string;
  createdAt: string;
}

interface FormType {
  title: string;
  price: string;
  stock: string;
  image: string;
}

const Products = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeModal, setActiveModal] = useState<
    "view" | "edit" | "delete" | null
  >(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const [localSearch, setLocalSearch] = useState("");
  const { products, setProducts, loading, error, page, setPage, meta } =
    useProducts({
      search: searchQuery,
      sort: sortOption,
      category,
    });

  const [form, setForm] = useState<FormType>({
    title: "",
    price: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localSearch); // Ito ang magti-trigger sa useProducts fetch
      setPage(1);
    }, 500); // Mag-antay ng 500ms matapos tumigil ang user sa pagtype

    return () => clearTimeout(handler);
  }, [localSearch]);

  const handleSort = (value: string) => {
    setSortOption(value);
    setPage(1);
  };

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
        stock: Number(form.stock) || 0,
        image: form.image,
      });

      setProducts((prev) => [data, ...prev]);
      setShowModal(false);

      setForm({ title: "", price: "", stock: "", image: "" });

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
      stock: String(product.stock || 0),
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
          stock: Number(form.stock),
          image: form.image,
        },
      );

      setProducts((prev) => prev.map((p) => (p._id === data._id ? data : p)));

      toast.success("Product updated ✏️");
      closeModal();
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

  if (loading && products.length === 0) {
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

      <Flex mb={4} gap={4} flexWrap="wrap">
        {/* SEARCH */}
        <Input
          placeholder="Search products..."
          value={localSearch} // Gamitin ang localSearch
          onChange={(e) => setLocalSearch(e.target.value)}
          maxW="250px"
          bg="white"
          _dark={{ bg: "gray.700" }}
        />

        {/* SORT */}
        <Select
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
          maxW="200px"
          bg="white"
          _dark={{ bg: "gray.700" }}
        >
          <option value="none">Sort</option>
          <option value="low_to_high">Price: Low to High</option>
          <option value="high_to_low">Price: High to Low</option>
          <option value="latest">Latest</option>
        </Select>
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
              <Th>Stock</Th>
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
                <Td
                  fontWeight="bold"
                  color={p.stock === 0 ? "red.500" : "green.500"}
                >
                  {p.stock}
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
        <AddModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          form={form}
          setForm={setForm}
          handleCreate={handleCreate}
        />
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
