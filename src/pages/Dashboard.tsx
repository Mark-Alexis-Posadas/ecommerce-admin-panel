import { useEffect, useState } from "react";
import {
  SimpleGrid,
  Box,
  Text,
  Heading,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
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

  // 🎨 THEME FIX
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
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

  const Card = ({ label, icon }: any) => (
    <Box
      p={6}
      borderRadius="xl"
      bg={cardBg}
      boxShadow="lg"
      border="1px solid"
      borderColor={borderColor}
    >
      <Flex align="center" justify="space-between">
        <Text color={textColor}>{label}</Text>
        {icon}
      </Flex>

      <Heading mt={3} size="lg">
        {stats.length}
      </Heading>
    </Box>
  );

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
      <Card label="Total Products" icon={<Package size={20} />} />
      <Card label="Orders" icon={<ShoppingCart size={20} />} />
      <Card label="Users" icon={<Users size={20} />} />
    </SimpleGrid>
  );
};

export default Dashboard;
