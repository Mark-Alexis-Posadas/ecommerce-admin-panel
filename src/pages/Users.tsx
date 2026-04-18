import { useEffect, useState } from "react";
import axios from "axios";
import { Users as UsersIcon } from "lucide-react";
import toast from "react-hot-toast";

import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const bg = useColorModeValue("white", "gray.800");
  const headBg = useColorModeValue("gray.100", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/users");
        setUsers(data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="60vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box>
      {/* HEADER */}
      <Flex align="center" gap={3} mb={6}>
        <UsersIcon />
        <Heading size="md">Users</Heading>
      </Flex>

      {/* TABLE */}
      <Box bg={bg} borderWidth="1px" borderRadius="xl" overflow="hidden">
        <Table>
          <Thead bg={headBg}>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Created</Th>
            </Tr>
          </Thead>

          <Tbody>
            {users.map((user) => (
              <Tr key={user._id} _hover={{ bg: hoverBg }} transition="0.2s">
                <Td fontWeight="semibold">{user.name}</Td>

                <Td color="gray.500">{user.email}</Td>

                <Td color="gray.400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* EMPTY STATE */}
        {users.length === 0 && (
          <Flex justify="center" p={6}>
            <Text color="gray.500">No users found</Text>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default Users;
