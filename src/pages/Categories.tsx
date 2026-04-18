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
  useColorModeValue,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";

const Categories = () => {
  const bg = useColorModeValue("white", "gray.800");
  const headBg = useColorModeValue("gray.100", "gray.700");

  const categories = [
    { id: 1, name: "Men", createdAt: "2026-04-01" },
    { id: 2, name: "Women", createdAt: "2026-04-02" },
    { id: 3, name: "Electronics", createdAt: "2026-04-03" },
  ];

  return (
    <Box>
      <Flex justify="space-between" mb={6}>
        <Heading size="md">Categories</Heading>
        <Button colorScheme="purple" leftIcon={<Plus size={16} />}>
          Add Category
        </Button>
      </Flex>

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
              <Tr key={c.id}>
                <Td>{c.name}</Td>
                <Td>{c.createdAt}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Categories;
