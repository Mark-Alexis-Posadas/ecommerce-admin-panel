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
  createdAt: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  // 🔥 POST CATEGORY
  const handleAddCategory = async () => {
    if (!name) return toast.error("Category name required");

    try {
      setSubmitting(true);

      const { data } = await axios.post(
        "http://localhost:5000/api/categories",
        {
          name,
        },
      );

      // update UI instantly
      setCategories((prev) => [data, ...prev]);

      setName("");
      toast.success("Category added 🚀");
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
      <Flex gap={2} mb={6}>
        <Input
          placeholder="New category..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          colorScheme="purple"
          leftIcon={<Plus size={16} />}
          onClick={handleAddCategory}
          isLoading={submitting}
        >
          Add
        </Button>
      </Flex>

      {/* TABLE */}
      <Box bg={bg} borderWidth="1px" borderRadius="xl">
        <Table>
          <Thead bg={headBg}>
            <Tr>
              <Th>Name</Th>
              <Th>Created</Th>
            </Tr>
          </Thead>

          <Tbody>
            {categories.map((c) => (
              <Tr key={c._id}>
                <Td>{c.name}</Td>
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
