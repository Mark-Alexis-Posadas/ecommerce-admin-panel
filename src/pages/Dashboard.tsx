import { useEffect, useState } from "react";
import { SimpleGrid, Box, Text, Heading, Flex } from "@chakra-ui/react";
import { Package, ShoppingCart, Users } from "lucide-react";
type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
};
const Dashboard = () => {
  const [stats, setStats] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        console.log(data);
        setStats(data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      {/* PRODUCTS */}
      <Box
        p={6}
        borderRadius="xl"
        bg="gray.800"
        boxShadow="lg"
        border="1px solid"
        borderColor="whiteAlpha.200"
      >
        <Flex align="center" justify="space-between">
          <Text color="gray.400">Total Products</Text>
          <Package size={20} />
        </Flex>

        <Heading mt={3} size="lg">
          {stats.length}
        </Heading>
      </Box>

      {/* ORDERS */}
      <Box
        p={6}
        borderRadius="xl"
        bg="gray.800"
        boxShadow="lg"
        border="1px solid"
        borderColor="whiteAlpha.200"
      >
        <Flex align="center" justify="space-between">
          <Text color="gray.400">Orders</Text>
          <ShoppingCart size={20} />
        </Flex>

        <Heading mt={3} size="lg">
          {stats.length}
        </Heading>
      </Box>

      {/* USERS */}
      <Box
        p={6}
        borderRadius="xl"
        bg="gray.800"
        boxShadow="lg"
        border="1px solid"
        borderColor="whiteAlpha.200"
      >
        <Flex align="center" justify="space-between">
          <Text color="gray.400">Users</Text>
          <Users size={20} />
        </Flex>

        <Heading mt={3} size="lg">
          {stats.length}
        </Heading>
      </Box>
    </SimpleGrid>
  );
};

export default Dashboard;
