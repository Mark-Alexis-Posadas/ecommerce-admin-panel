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

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Product = {
  _id: string;
  title: string;
};

const Dashboard = () => {
  const [stats, setStats] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading...</p>;

  // 📊 1. Revenue (Line)
  const revenueData = [
    { name: "Jan", revenue: 4000 },
    { name: "Feb", revenue: 3000 },
    { name: "Mar", revenue: 5000 },
    { name: "Apr", revenue: 7000 },
    { name: "May", revenue: 6000 },
  ];

  // 📊 2. Top Products (Bar)
  const topProducts = [
    { name: "Shoes", sales: 120 },
    { name: "Watch", sales: 90 },
    { name: "Bag", sales: 70 },
    { name: "Jacket", sales: 60 },
  ];

  // 📊 3. Categories (Pie)
  const categoryData = [
    { name: "Men", value: 400 },
    { name: "Women", value: 300 },
    { name: "Electronics", value: 300 },
  ];

  const COLORS = ["#7c3aed", "#06b6d4", "#22c55e"];

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
    <Box>
      {/* STATS */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
        <Card label="Total Products" icon={<Package size={20} />} />
        <Card label="Orders" icon={<ShoppingCart size={20} />} />
        <Card label="Users" icon={<Users size={20} />} />
      </SimpleGrid>

      {/* 📊 CHARTS */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* Category Pie */}
        <Box
          p={6}
          borderRadius="xl"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
        >
          <Heading size="sm" mb={4}>
            Category Distribution
          </Heading>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Top Products Bar */}
        <Box
          p={6}
          borderRadius="xl"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
        >
          <Heading size="sm" mb={4}>
            Top Products
          </Heading>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        {/* Revenue Line */}
        <Box
          p={6}
          borderRadius="xl"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          gridColumn={{ md: "span 2" }}
        >
          <Heading size="sm" mb={4}>
            Revenue Trend
          </Heading>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#7c3aed"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
