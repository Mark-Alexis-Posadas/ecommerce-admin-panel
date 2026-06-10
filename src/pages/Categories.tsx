import { useEffect, useState } from "react";
import axios from "axios";
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
  Input,
  Spinner,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });

  const bg = useColorModeValue("white", "gray.800");
  const headBg = useColorModeValue("gray.100", "gray.700");

  // 🔥 FETCH
  const fetchCategories = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "http://localhost:5000/api/products/categories",
      );

      setCategories(data.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!form.name) {
      return toast.error("Category name required");
    }

    try {
      setSubmitting(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/categories",
        {
          ...form,
        },
      );

      setCategories((prev) => [data, ...prev]);

      setForm({
        name: "",
        description: "",
        image: "",
      });

      toast.success("Category added");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add category");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Center h="300px">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box>
      {/* HEADER */}
      <Flex justify="space-between" mb={6}>
        <Heading size="md">Categories</Heading>
      </Flex>

      {/* ADD CATEGORY */}
      <Flex direction="column" gap={3} mb={6}>
        <Input
          placeholder="Category name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <Input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <Input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />

        <Button
          colorScheme="purple"
          leftIcon={<Plus size={16} />}
          onClick={handleAddCategory}
          isLoading={submitting}
          alignSelf="start"
        >
          Add Category
        </Button>
      </Flex>

      {/* TABLE */}
      <Box bg={bg} borderWidth="1px" borderRadius="xl">
        <Table>
          <Thead bg={headBg}>
            <Tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th>Created</Th>
            </Tr>
          </Thead>

          <Tbody>
            {categories.map((c) => (
              <Tr key={c._id}>
                <Td>
                  <img
                    src={c.image || "https://via.placeholder.com/60"}
                    alt={c.name}
                    width={60}
                    height={60}
                    style={{
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                </Td>

                <Td fontWeight="bold">{c.name}</Td>

                <Td maxW="300px">{c.description || "-"}</Td>

                <Td>
                  <Box
                    px={2}
                    py={1}
                    borderRadius="md"
                    bg={c.isActive ? "green.100" : "red.100"}
                    color={c.isActive ? "green.700" : "red.700"}
                    w="fit-content"
                  >
                    {c.isActive ? "Active" : "Inactive"}
                  </Box>
                </Td>

                <Td>{new Date(c.createdAt).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Categories;
